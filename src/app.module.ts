import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService], //dá acesso ao AppService a quem importar o AppModule
})
export class AppModule {}
