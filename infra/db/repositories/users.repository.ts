import { Prisma, Users } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { UserModel } from "../../../domains";
import { IDatabaseEntity } from "../../../domains/entities/database.entity";
import { DatabaseRepositoryService } from "../database.repository.service";
import { DatabaseUnitOfWorkServiceScoped } from "../database.unit-of-work.scoped.service";

export type DatabaseUsersRepositoryType = Prisma.UsersDelegate<DefaultArgs>;
// export type DatabaseUsersModel = Users & UserDataModel;
/** 
 * @description Database User Model implements domain DomainModel to provide DomainEntity data. 
 * It's only used by the database layer to secure correctly data mapping between schema and models 
 */
class DatabaseUserModel extends UserModel implements IDatabaseEntity<string>, Users {}

export abstract class DatabaseUsersRepository<TId = string, TEntity = DatabaseUserModel> 
    extends DatabaseRepositoryService<TId, TEntity>
{
    constructor(
        protected uow: DatabaseUnitOfWorkServiceScoped
    ) {
        super(uow, uow.adapter?.users as DatabaseUsersRepositoryType);
    }
    override async create(entity: TEntity): Promise<TEntity> {
        const result = await super.create(entity);
        return result;
    }
}