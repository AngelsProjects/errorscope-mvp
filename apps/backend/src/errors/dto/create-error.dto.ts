import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ErrorEventDto {
  @IsNotEmpty()
  message: string;

  stack?: string;

  @IsNotEmpty()
  timestamp: number;

  @IsNotEmpty()
  level: 'error' | 'warning' | 'info';

  @IsNotEmpty()
  metadata: {
    appName?: string;
    environment?: string;
    userAgent?: string;
    url?: string;
    customData?: Record<string, any>;
  };
}

export class CreateErrorDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ErrorEventDto)
  events: ErrorEventDto[];
}
