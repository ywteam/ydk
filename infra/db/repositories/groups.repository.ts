import { Prisma, Groups } from "@prisma/client";
import { DatabaseRepositoryService } from "../database.repository.service";
import { DatabaseUnitOfWorkServiceScoped } from "../database.unit-of-work.scoped.service";
import { DatabaseEntity } from "../../../domains/entities/database.entity";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { GroupModel } from "../../../domains";

export type DatabaseGroupsRepositoryType = Prisma.GroupsDelegate<DefaultArgs>;
class DatabaseGroupModel extends GroupModel implements DatabaseEntity<number>, Groups { }
export abstract class DatabaseGroupsRepository<TId = string, TEntity = DatabaseGroupModel> extends DatabaseRepositoryService<TId, TEntity>
{
    constructor(
        protected uow: DatabaseUnitOfWorkServiceScoped
    ) {
        super(uow, uow.adapter?.groups as DatabaseGroupsRepositoryType);
    }    
}