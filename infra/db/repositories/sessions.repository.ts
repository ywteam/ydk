import { Prisma, Sessions } from "@prisma/client";
import { DatabaseRepositoryService } from "../database.repository.service";
import { DatabaseUnitOfWorkServiceScoped } from "../database.unit-of-work.scoped.service";
import { DatabaseEntity } from "../../../domains/entities/database.entity";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { SessionModel } from "../../../domains";

export type DatabaseSessionsRepositoryType = Prisma.SessionsDelegate<DefaultArgs>;
class DatabaseSessionModel extends SessionModel implements DatabaseEntity<string>, Sessions { }
export abstract class DatabaseSessionsRepository<
    TId = string, 
    TEntity = DatabaseSessionModel
>
    extends DatabaseRepositoryService<TId, TEntity>
{
    constructor(
        protected uow: DatabaseUnitOfWorkServiceScoped
    ) {
        super(uow, uow.adapter?.sessions as DatabaseSessionsRepositoryType);
    }    
}