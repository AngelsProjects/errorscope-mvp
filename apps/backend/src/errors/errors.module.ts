import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorsController } from './errors.controller';
import { ErrorsService } from './errors.service';
import { ErrorEvent } from './entities/error-event.entity';
import { ErrorGroup } from './entities/error-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ErrorEvent, ErrorGroup])],
  controllers: [ErrorsController],
  providers: [ErrorsService],
})
export class ErrorsModule {}
