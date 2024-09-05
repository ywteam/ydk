import { Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client'
import * as util from "util";
export const LoggingExtension = Prisma.defineExtension((prisma) => {
    const logger: Logger = new Logger('DatabaseLoggingExtension');
    return prisma.$extends({
        name: 'logging',
        query: {
            $allModels: {
                async $allOperations({ model, operation, args, query }) {
                    const start = performance.now()
                    const result = await query(args)
                    const end = performance.now()
                    const time = end - start;
                    logger.log(`Query ${model}.${operation} took ${time}ms`);
                    // console.log(
                    //     util.inspect(
                    //       { model, operation, args, time },
                    //       { showHidden: false, depth: null, colors: true }
                    //     )
                    //   );
                    return result
                }
            }
        }
    })
})
