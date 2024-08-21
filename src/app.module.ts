import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          limit: 100,
          ttl: 60 * 1000,
        },
      ],
      ignoreUserAgents: [/Googlebot/gi],
    }),
    UserModule,
    AuthModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [AppService], //dá acesso ao AppService a quem importar o AppModule
})
export class AppModule {}
