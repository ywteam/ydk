import { Hashes, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { HashModel } from "../../../domains";
import { DatabaseEntity } from "../../../domains/entities/database.entity";
import { DatabaseRepositoryService } from "../database.repository.service";
import { DatabaseUnitOfWorkServiceScoped } from "../database.unit-of-work.scoped.service";

export type DatabaseHashesRepositoryType = Prisma.HashesDelegate<DefaultArgs>;
class DatabaseHashModel extends HashModel implements DatabaseEntity<string>, Hashes { }
export abstract class DatabaseHashesRepository<
    TId = string, 
    TEntity = DatabaseHashModel
>
    extends DatabaseRepositoryService<TId, TEntity>
{
    constructor(
        protected uow: DatabaseUnitOfWorkServiceScoped
    ) {
        super(uow, uow.adapter?.hashes as DatabaseHashesRepositoryType);
    }    
}