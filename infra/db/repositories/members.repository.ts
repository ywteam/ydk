import { Prisma, Members } from "@prisma/client";
import { DatabaseRepositoryService } from "../database.repository.service";
import { DatabaseUnitOfWorkServiceScoped } from "../database.unit-of-work.scoped.service";
import { DatabaseEntity } from "../../../domains/entities/database.entity";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { MemberModel } from "../../../domains";

export type DatabaseMembersRepositoryType = Prisma.MembersDelegate<DefaultArgs>;
class DatabaseMemberModel extends MemberModel implements DatabaseEntity<string>, Members { }
export abstract class DatabaseMembersRepository<
    TId = string, 
    TEntity = DatabaseMemberModel
>
    extends DatabaseRepositoryService<TId, TEntity>
{
    constructor(
        protected uow: DatabaseUnitOfWorkServiceScoped
    ) {
        super(uow, uow.adapter?.members as DatabaseMembersRepositoryType);
    }    
}