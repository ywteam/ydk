import { Provider, Scope } from "@nestjs/common";
import { DatabaseUnitOfWorkService, DatabaseClientService } from "./database.unit-of-work.service";
import { ClsService, ClsServiceManager } from 'nestjs-cls'
import { DATABASE_CLIENT_SCOPED_TOKEN, DATABASE_CLIENT_TOKEN, DATABASE_CURRENT_USER_ID } from "./database.constants";
import { DatabaseUnitOfWorkServiceScoped } from "./database.unit-of-work.scoped.service";


export const PROVIDERS: Provider[] = [
    {
        scope: Scope.REQUEST,
        provide: DATABASE_CURRENT_USER_ID,
        useFactory(/*cls: ClsService*/): string {
            const cls: ClsService = ClsServiceManager.getClsService()
            return cls.get<string>('userId');
        },
        // inject: [ClsService]
    },
    {
        scope: Scope.REQUEST,
        provide: DATABASE_CLIENT_TOKEN,
        useFactory(userId: string): DatabaseClientService {
            return DatabaseUnitOfWorkService.create(() => userId) as DatabaseClientService;
        },
        inject: [DATABASE_CURRENT_USER_ID]
    },
    {
        scope: Scope.REQUEST,
        provide: DATABASE_CLIENT_SCOPED_TOKEN,
        useFactory(adapter: DatabaseClientService): DatabaseUnitOfWorkServiceScoped {
            return new DatabaseUnitOfWorkServiceScoped(adapter);
        },
        inject: [DATABASE_CLIENT_TOKEN]
    }
];