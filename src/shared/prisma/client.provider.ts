import {
  INestApplication,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from 'prisma/generated/client';
import { AddMethodsExtension } from './extensions/add-methods-extension';
import { FormatResponseExtension } from './extensions/format-response-extension';
import { AddLogsExtension } from './extensions/add-logs-extension';
import { ComputedFieldExtension } from './extensions/computed-field-extension';

@Injectable()
export class PrismaClientProvider
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    private readonly addMethodsExtension: AddMethodsExtension,
    private readonly formatResponseExtension: FormatResponseExtension,
    private readonly addLogsExtension: AddLogsExtension,
    private readonly computedFieldExtension: ComputedFieldExtension,
  ) {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  withExtensions() {
    return (
      this.$extends(this.addMethodsExtension.exists)
        // .$extends(this.formatResponseExtension.formatDates)
        // .$extends(this.formatResponseExtension.upperCase)
        .$extends(this.addLogsExtension.perfomanceLog)
        .$extends(this.computedFieldExtension.addUpdatedAtBr)
    );
  }

  onModuleInit() {
    return this.$connect();
  }

  onModuleDestroy() {
    return this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
