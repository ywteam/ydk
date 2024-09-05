import { Prisma, Subscriptions } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { SubscriptionModel } from "../../../domains";
import { DatabaseEntity } from "../../../domains/entities/database.entity";
import { DatabaseRepositoryService } from "../database.repository.service";
import { DatabaseUnitOfWorkServiceScoped } from "../database.unit-of-work.scoped.service";

export type DatabaseSubscriptionsRepositoryType = Prisma.SubscriptionsDelegate<DefaultArgs>;
class DatabaseSubscriptionModel extends SubscriptionModel implements DatabaseEntity<string>, Subscriptions { }
export abstract class DatabaseSubscriptionsRepository<
    TId = string, 
    TEntity = DatabaseSubscriptionModel
>
    extends DatabaseRepositoryService<TId, TEntity>
{
    constructor(
        protected uow: DatabaseUnitOfWorkServiceScoped
    ) {
        super(uow, uow.adapter?.subscriptions as DatabaseSubscriptionsRepositoryType);
    }    
}