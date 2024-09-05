import { Prisma, Tenants } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { TenantModel } from "../../../domains";
import { DatabaseEntity } from "../../../domains/entities/database.entity";
import { DatabaseRepositoryService } from "../database.repository.service";
import { DatabaseUnitOfWorkServiceScoped } from "../database.unit-of-work.scoped.service";

export type DatabaseTenantsRepositoryType = Prisma.TenantsDelegate<DefaultArgs>;
class DatabaseTenantModel extends TenantModel implements DatabaseEntity<string>, Tenants { }
export abstract class DatabaseTenantsRepository<
    TId = string, 
    TEntity = DatabaseTenantModel
>
    extends DatabaseRepositoryService<TId, TEntity>
{
    constructor(
        protected uow: DatabaseUnitOfWorkServiceScoped
    ) {
        super(uow, uow.adapter?.tenants as DatabaseTenantsRepositoryType);
    }    
}