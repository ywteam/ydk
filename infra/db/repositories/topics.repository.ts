import { Prisma, Topics } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { TopicModel } from "../../../domains";
import { DatabaseEntity } from "../../../domains/entities/database.entity";
import { DatabaseRepositoryService } from "../database.repository.service";
import { DatabaseUnitOfWorkServiceScoped } from "../database.unit-of-work.scoped.service";

export type DatabaseTopicsRepositoryType = Prisma.TopicsDelegate<DefaultArgs>;
class DatabaseTopicModel extends TopicModel implements DatabaseEntity<string>, Topics { }
export abstract class DatabaseTopicsRepository<
    TId = string, 
    TEntity = DatabaseTopicModel
>
    extends DatabaseRepositoryService<TId, TEntity>
{
    constructor(
        protected uow: DatabaseUnitOfWorkServiceScoped
    ) {
        super(uow, uow.adapter?.topics as DatabaseTopicsRepositoryType);
    }    
}