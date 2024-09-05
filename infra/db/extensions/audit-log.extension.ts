import { Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client'
import { DATABASE_AUDIT_USER_ID } from '../database.constants';
// https://github.com/prisma/prisma-client-extensions/blob/main/audit-log-context/README.md
export type AuditLogUserProvider = (context?: any) => string | Promise<string>;
export const AuditLogExtension = function (userIdProvider: AuditLogUserProvider) {
  const logger: Logger = new Logger(`Database${AuditLogExtension.name}`);
  return Prisma.defineExtension((prisma) => {
    const getUserId = async (model: any, operation: any, context?: any) => {
      let userId: string
      if (userIdProvider.constructor.name === 'AsyncFunction') userId = await userIdProvider(model);
      else userId = userIdProvider(context) as string;
      !userId && (userId = DATABASE_AUDIT_USER_ID.toString()) && logger.warn(`Query ${model}.${operation} by unknown user, using ${DATABASE_AUDIT_USER_ID.toString()} as default`);
      return userId;
    };
    return prisma.$extends({
      name: 'audit-log',
      query: {        
        $allModels: {
          async $allOperations({ model, operation, args, query }) {
            const userId = await getUserId(model, operation, model);
            switch (operation) {
              case 'create':
                args['data'] = { ...(args['data'] ?? {}), createdBy: userId, createdAt: new Date() }
                break;
              case 'update':
                args['data'] = { ...(args['data'] ?? {}), updatedBy: userId, updatedAt: new Date() }
                break;
              default:
                break;
            }
            const [, result] = await prisma.$transaction([
              prisma.$executeRaw`SELECT set_config('app.current_user_id', ${userId.toString()}, TRUE)`,
              query(args),
            ]);
            logger.log(`Query ${model}.${operation} by ${userId}`);
            return result;
          }
        }
      }
    })
  })
}