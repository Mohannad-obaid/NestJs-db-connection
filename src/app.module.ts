import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { schemaJois } from 'config/config-module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: schemaJois,
      isGlobal: true,
    }),
    UsersModule,
    DatabaseModule,
  ],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
