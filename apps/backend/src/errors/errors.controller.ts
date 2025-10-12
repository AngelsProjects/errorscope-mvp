import { Controller, Get, Post, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ErrorsService } from './errors.service';
import { CreateErrorDto } from './dto/create-error.dto';

@Controller('api/errors')
export class ErrorsController {
  constructor(private readonly errorsService: ErrorsService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async create(@Body() createErrorDto: CreateErrorDto) {
    await this.errorsService.createErrors(createErrorDto);
    return { success: true };
  }

  @Get('groups')
  async getGroups(@Query('limit') limit?: number) {
    return this.errorsService.getErrorGroups(limit);
  }

  @Get('groups/:fingerprint')
  async getGroup(@Param('fingerprint') fingerprint: string) {
    return this.errorsService.getErrorGroup(fingerprint);
  }

  @Get('recent')
  async getRecent(@Query('limit') limit?: number) {
    return this.errorsService.getRecentEvents(limit);
  }

  @Get('stats')
  async getStats() {
    return this.errorsService.getStats();
  }
}
