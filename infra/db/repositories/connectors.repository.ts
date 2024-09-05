import { Prisma, Connectors } from "@prisma/client";
import { DatabaseRepositoryService } from "../database.repository.service";
import { DatabaseUnitOfWorkServiceScoped } from "../database.unit-of-work.scoped.service";
import { DatabaseEntity } from "../../../domains/entities/database.entity";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { ConnectorModel } from "../../../domains";

export type DatabaseConnectorsRepositoryType = Prisma.ConnectorsDelegate<DefaultArgs>;
class DatabaseConnectorModel extends ConnectorModel implements DatabaseEntity<string>, Connectors {
    name: string;
    enabled: boolean;
}
export abstract class DatabaseConnectorsRepository<TId = string, TEntity = DatabaseConnectorModel>
    extends DatabaseRepositoryService<TId, TEntity>
{
    constructor(
        protected uow: DatabaseUnitOfWorkServiceScoped
    ) {
        super(uow, uow.adapter?.connectors as DatabaseConnectorsRepositoryType);
    }    
}