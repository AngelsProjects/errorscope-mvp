import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { ErrorEvent } from './entities/error-event.entity';
import { ErrorGroup } from './entities/error-group.entity';
import { CreateErrorDto, ErrorEventDto } from './dto/create-error.dto';
import * as crypto from 'crypto';

@Injectable()
export class ErrorsService {
  constructor(
    @InjectRepository(ErrorEvent)
    private errorEventRepository: Repository<ErrorEvent>,
    @InjectRepository(ErrorGroup)
    private errorGroupRepository: Repository<ErrorGroup>
  ) {}

  private generateFingerprint(message: string, stack?: string): string {
    // Simple fingerprinting: hash the error message + first 3 stack frames
    const stackLines = stack?.split('\n').slice(0, 3).join('\n') || '';
    const content = `${message}${stackLines}`;
    return crypto.createHash('md5').update(content).digest('hex');
  }

  async createErrors(createErrorDto: CreateErrorDto): Promise<void> {
    const { events } = createErrorDto;

    for (const eventDto of events) {
      const fingerprint = this.generateFingerprint(eventDto.message, eventDto.stack);

      // Upsert error group
      let group = await this.errorGroupRepository.findOne({
        where: { fingerprint },
      });

      if (!group) {
        group = this.errorGroupRepository.create({
          fingerprint,
          message: eventDto.message,
          stack: eventDto.stack,
          count: 1,
          appName: eventDto.metadata.appName,
          environment: eventDto.metadata.environment,
        });
      } else {
        group.count += 1;
        group.lastSeen = new Date();
      }

      await this.errorGroupRepository.save(group);

      // Create error event
      const errorEvent = this.errorEventRepository.create({
        fingerprint,
        message: eventDto.message,
        stack: eventDto.stack,
        level: eventDto.level,
        metadata: eventDto.metadata,
        createdAt: new Date(eventDto.timestamp),
      });

      await this.errorEventRepository.save(errorEvent);
    }
  }

  async getErrorGroups(limit = 50) {
    return this.errorGroupRepository.find({
      order: { lastSeen: 'DESC' },
      take: limit,
    });
  }

  async getErrorGroup(fingerprint: string) {
    return this.errorGroupRepository.findOne({
      where: { fingerprint },
      relations: ['events'],
    });
  }

  async getRecentEvents(limit = 100) {
    return this.errorEventRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async getStats() {
    const totalErrors = await this.errorEventRepository.count();
    const totalGroups = await this.errorGroupRepository.count();
    const last24h = await this.errorEventRepository.count({
      where: {
        createdAt: MoreThan(new Date(Date.now() - 24 * 60 * 60 * 1000)),
      },
    });

    return {
      totalErrors,
      totalGroups,
      last24Hours: last24h,
    };
  }
}
