// import {
//   Injectable,
//   OnModuleInit,
//   INestApplication,
//   OnModuleDestroy,
// } from '@nestjs/common';
// import { Prisma, PrismaClient } from '@prisma/client';
// import { formatDateMiddleware } from 'src/middlewares/prisma-format-date.middleware';
// import {
//   extendQueryFormatDates,
//   formatDates,
//   myExtension,
// } from './extensions/format-dates-extension';
// import { lowercaseExtension } from './extensions/lowercase';

// @Injectable()
// export class PrismaService
//   extends PrismaClient
//   implements OnModuleInit, OnModuleDestroy
// {
//   constructor() {
//     super();
//     this.$extends({
//       result: {
//         material: {
//           myComputedField: {
//             compute() {
//               return 'myComputedField';
//             },
//           },
//         },
//       },
//     });
//   }

//   async onModuleInit() {
//     await Prisma.getExtensionContext(this).$connect();
//   }

//   async onModuleDestroy() {
//     await this.$disconnect();
//   }

//   async enableShutdownHooks(app: INestApplication) {
//     process.on('beforeExit', async () => {
//       await app.close();
//     });
//   }
// }
