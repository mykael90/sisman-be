import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { formatDates } from 'src/common/utils/format-date-time-br';

@Injectable()
export class ComputedFieldExtension {
  addUpdatedAtBr = Prisma.defineExtension({
    name: 'format-dates-extension',
    result: {
      $allModels: {
        updatedAtBr: {
          needs: {},
          compute(data: { updatedAt: Date }) {
            return formatDates(data.updatedAt);
          },
        },
        createdAtBr: {
          needs: {},
          compute(data: { createdAt: Date }) {
            return formatDates(data.createdAt);
          },
        },
      },
    },
  });
}
