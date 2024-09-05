import { Devices, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { DeviceModel } from "../../../domains";
import { DatabaseEntity } from "../../../domains/entities/database.entity";
import { DatabaseRepositoryService } from "../database.repository.service";
import { DatabaseUnitOfWorkServiceScoped } from "../database.unit-of-work.scoped.service";

export type DatabaseDevicesRepositoryType = Prisma.DevicesDelegate<DefaultArgs>;
class DatabaseDeviceModel extends DeviceModel implements DatabaseEntity<string>, Devices { }
export abstract class DatabaseDevicesRepository<
    TId = string, 
    TEntity = DatabaseDeviceModel
>
    extends DatabaseRepositoryService<TId, TEntity>
{
    constructor(
        protected uow: DatabaseUnitOfWorkServiceScoped
    ) {
        super(uow, uow.adapter?.devices as DatabaseDevicesRepositoryType);
    }    
}