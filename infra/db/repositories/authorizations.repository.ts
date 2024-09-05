import { Prisma, Authorizarions } from "@prisma/client";
import { DatabaseRepositoryService } from "../database.repository.service";
import { DatabaseUnitOfWorkServiceScoped } from "../database.unit-of-work.scoped.service";
import { DatabaseEntity } from "../../../domains/entities/database.entity";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { AuthorizationModel } from "../../../domains";

export type DatabaseAuthorizarionsRepositoryType = Prisma.AuthorizarionsDelegate<DefaultArgs>;
class DatabaseAuthorizationModel extends AuthorizationModel implements DatabaseEntity<string>, Authorizarions { }
export abstract class DatabaseAuthorizarionsRepository<TId = string, TEntity = DatabaseAuthorizationModel>
    extends DatabaseRepositoryService<TId, TEntity>
{
    constructor(
        protected uow: DatabaseUnitOfWorkServiceScoped
    ) {
        super(uow, uow.adapter?.authorizarions as DatabaseAuthorizarionsRepositoryType);
    }    
}