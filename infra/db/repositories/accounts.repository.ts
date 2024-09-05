import { Prisma, Accounts } from "@prisma/client";
import { DatabaseRepositoryService } from "../database.repository.service";
import { DatabaseUnitOfWorkServiceScoped } from "../database.unit-of-work.scoped.service";
import { DatabaseEntity } from "../../../domains/entities/database.entity";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { AccountModel } from "../../../domains";

export type DatabaseAccountRepositoryType = Prisma.AccountsDelegate<DefaultArgs>;
class DatabaseAccountModel extends AccountModel implements DatabaseEntity<string>, Accounts { }
export abstract class DatabaseAccountRepository<TId = string, TEntity = DatabaseAccountModel>
    extends DatabaseRepositoryService<TId, TEntity>
{
    constructor(
        protected uow: DatabaseUnitOfWorkServiceScoped
    ) {
        super(uow, uow.adapter?.accounts as DatabaseAccountRepositoryType);
    }
}