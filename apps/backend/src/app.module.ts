import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorsModule } from './errors/errors.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'errorscope',
      password: process.env.DB_PASSWORD || 'dev_password',
      database: process.env.DB_NAME || 'errorscope',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Only for MVP - use migrations in production
    }),
    ErrorsModule,
  ],
})
export class AppModule {}
