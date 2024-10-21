import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { schemaJois } from 'config/config-module.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: schemaJois,
    }),
    UsersModule,
  ],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
