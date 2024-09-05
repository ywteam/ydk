import { Prisma } from '@prisma/client'
export const SoftDeleteExtension = Prisma.defineExtension((prisma) => {
    return prisma.$extends({
        name: 'soft-delete',
        query: {
            async $allOperations({ model, operation, args, query }) {
                switch (operation) {
                    case 'findUnique':
                    case 'findMany':
                    case 'findFirst':
                    case 'count':
                    case 'aggregate':
                    case 'update':
                        args['where'] = { ...(args['where'] ?? {}), deletedAt: (args['where'] ?? {})?.deletedAt ?? null }
                        break;
                    default:
                        break;
                }
                return query(args)
            }
        }
    })
})