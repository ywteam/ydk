import { Prisma, Tests } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { TestModel } from "../../../domains";
import { DatabaseEntity } from "../../../domains/entities/database.entity";
import { DatabaseRepositoryService } from "../database.repository.service";
import { DatabaseUnitOfWorkServiceScoped } from "../database.unit-of-work.scoped.service";

export type DatabaseTestsRepositoryType = Prisma.TestsDelegate<DefaultArgs>;
class DatabaseTestModel extends TestModel implements DatabaseEntity<string>, Tests { }
export abstract class DatabaseTestsRepository<TId = string, TEntity = DatabaseTestModel> extends DatabaseRepositoryService<TId, TEntity>
{
    constructor(
        protected uow: DatabaseUnitOfWorkServiceScoped
    ) {
        super(uow, uow.adapter?.tests as DatabaseTestsRepositoryType);
    }    
}