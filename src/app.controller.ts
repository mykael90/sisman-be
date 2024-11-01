import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('delay')
  async delay() {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return 'Delayed response';
  }

  @Get('error')
  error() {
    throw new BadRequestException('Something bad happened', {
      cause: new Error('Internal Server Error'),
      description: 'Some error description',
    });
  }
}
