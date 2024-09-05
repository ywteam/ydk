import { Prisma, Credentials } from "@prisma/client";
import { DatabaseRepositoryService } from "../database.repository.service";
import { DatabaseUnitOfWorkServiceScoped } from "../database.unit-of-work.scoped.service";
import { DatabaseEntity } from "../../../domains/entities/database.entity";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { CredentialModel } from "../../../domains";

export type DatabaseCredentialsRepositoryType = Prisma.CredentialsDelegate<DefaultArgs>;
class DatabaseCredentialModel extends CredentialModel implements DatabaseEntity<string>, Credentials { }
export abstract class DatabaseCredentialsRepository<TId = string, TEntity = DatabaseCredentialModel>
    extends DatabaseRepositoryService<TId, TEntity>
{
    constructor(
        protected uow: DatabaseUnitOfWorkServiceScoped
    ) {
        super(uow, uow.adapter?.credentials as DatabaseCredentialsRepositoryType);
    }    
}