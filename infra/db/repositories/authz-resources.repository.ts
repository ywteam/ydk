import { AuthorizationResources, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { AuthorizationResourceModel } from "../../../domains";
import { DatabaseEntity } from "../../../domains/entities/database.entity";
import { DatabaseRepositoryService } from "../database.repository.service";
import { DatabaseUnitOfWorkServiceScoped } from "../database.unit-of-work.scoped.service";

export type DatabaseAuthorizationResourcesRepositoryType = Prisma.AuthorizationResourcesDelegate<DefaultArgs>;
class DatabaseAuthorizationResourcesModel extends AuthorizationResourceModel implements DatabaseEntity<string>, AuthorizationResources { }
export abstract class DatabaseAuthorizationResourcesRepository<TId = string, TEntity = DatabaseAuthorizationResourcesModel>
    extends DatabaseRepositoryService<TId, TEntity>
{
    constructor(
        protected uow: DatabaseUnitOfWorkServiceScoped
    ) {
        super(uow, uow.adapter?.authorizationResources as DatabaseAuthorizationResourcesRepositoryType);
    }    
}