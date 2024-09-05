import { Prisma, Teams } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { TeamModel } from "../../../domains";
import { DatabaseEntity } from "../../../domains/entities/database.entity";
import { DatabaseRepositoryService } from "../database.repository.service";
import { DatabaseUnitOfWorkServiceScoped } from "../database.unit-of-work.scoped.service";

export type DatabaseTeamsRepositoryType = Prisma.TeamsDelegate<DefaultArgs>;
class DatabaseTeamModel extends TeamModel implements DatabaseEntity<string>, Teams { }
export abstract class DatabaseTeamsRepository<
    TId = string, 
    TEntity = DatabaseTeamModel
>
    extends DatabaseRepositoryService<TId, TEntity>
{
    constructor(
        protected uow: DatabaseUnitOfWorkServiceScoped
    ) {
        super(uow, uow.adapter?.teams as DatabaseTeamsRepositoryType);
    }    
}