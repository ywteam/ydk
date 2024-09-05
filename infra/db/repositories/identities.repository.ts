import { Identities, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { IdentityModel } from "../../../domains";
import { DatabaseEntity } from "../../../domains/entities/database.entity";
import { DatabaseRepositoryService } from "../database.repository.service";
import { DatabaseUnitOfWorkServiceScoped } from "../database.unit-of-work.scoped.service";

export type DatabaseIdentitiesRepositoryType = Prisma.IdentitiesDelegate<DefaultArgs>;
class DatabaseIdentitiesModel extends IdentityModel implements DatabaseEntity<string>, Identities { }
export abstract class DatabaseIdentitiesRepository<
    TId = string, 
    TEntity = DatabaseIdentitiesModel
>
    extends DatabaseRepositoryService<TId, TEntity>
{
    constructor(
        protected uow: DatabaseUnitOfWorkServiceScoped
    ) {
        super(uow, uow.adapter?.identities as DatabaseIdentitiesRepositoryType);
    }    
}