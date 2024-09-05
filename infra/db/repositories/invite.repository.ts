import { Prisma, Invites } from "@prisma/client";
import { DatabaseRepositoryService } from "../database.repository.service";
import { DatabaseUnitOfWorkServiceScoped } from "../database.unit-of-work.scoped.service";
import { DatabaseEntity } from "../../../domains/entities/database.entity";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { InviteModel } from "../../../domains";

export type DatabaseInvitesRepositoryType = Prisma.InvitesDelegate<DefaultArgs>;
class DatabaseInviteModel extends InviteModel implements DatabaseEntity<string>, Invites { }
export abstract class DatabaseInvitesRepository<
    TId = string, 
    TEntity = DatabaseInviteModel
>
    extends DatabaseRepositoryService<TId, TEntity>
{
    constructor(
        protected uow: DatabaseUnitOfWorkServiceScoped
    ) {
        super(uow, uow.adapter?.invites as DatabaseInvitesRepositoryType);
    }    
}