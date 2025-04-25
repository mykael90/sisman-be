import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './shared/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';
import { MaterialsModule } from './modules/materials/materials.module';
import { FilesModule } from './shared/files/files.module';
import { ConfigModule } from '@nestjs/config';
import { HttpExceptionFilter } from './shared/exception_filters/http-exception.filter';
import mailerConfig from './config/mailer.config';
import { validationSchema } from './config/validation.schema';
import { LogErrorModule } from './shared/log-error/log-error.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [mailerConfig],
      validationSchema,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          limit: 100,
          ttl: 60 * 1000,
        },
      ],
      ignoreUserAgents: [/Googlebot/gi],
    }),
    UsersModule,
    AuthModule,
    FilesModule,
    MailerModule.forRootAsync({
      useFactory: mailerConfig,
    }),
    MaterialsModule,
    LogErrorModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [AppService], //dá acesso ao AppService a quem importar o AppModule
})
export class AppModule {}
