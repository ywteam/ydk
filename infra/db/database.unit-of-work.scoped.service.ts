import { Prisma } from '@prisma/client';
import { DatabaseUnitOfWork } from '../../domains/interfaces/db/unit-of-work.contract';
import { DatabaseClientService } from './database.unit-of-work.service';
// import { DATABASE_CLIENT_INJECTION_TOKEN } from './database.providers';
import { ClsService, ClsServiceManager, ClsStore } from 'nestjs-cls';
import { DATABASE_AUDIT_USER_ID } from './database.constants';

// @Injectable({ scope: Scope.REQUEST }) 
export class DatabaseUnitOfWorkServiceScoped
  implements DatabaseUnitOfWork<DatabaseUnitOfWorkServiceScoped, Prisma.TransactionClient>
{
  public client: Prisma.TransactionClient;
  #cls: ClsService<ClsStore>;
  protected get cls(): ClsService<ClsStore> { return this.#cls ?? (this.#cls = ClsServiceManager.getClsService()); }
  constructor(
    // private readonly prisma: DatabaseUnitOfWorkService,
    // @Inject(DATABASE_CLIENT_INJECTION_TOKEN) 
    public readonly adapter: DatabaseClientService,
  ) {
    if(!adapter) throw new Error('DatabaseUnitOfWorkServiceScoped: adapter is undefined');
    this.client = adapter;
    this.adapter.userIdProvider = () => this.cls?.get('userId') ?? DATABASE_AUDIT_USER_ID.toString();
  }
  // create(): DatabaseUnitOfWork<DatabaseUnitOfWorkServiceScoped, Prisma.TransactionClient> {
  //   return new DatabaseUnitOfWorkServiceScoped(new DatabaseUnitOfWorkService());
  // }
  getClient(): Prisma.TransactionClient {
    return this.client;
  }

  async runInTransaction<T>(fn: (manager: any) => Promise<T>): Promise<T> {
    return await this.adapter.$transaction(async (manager) => {
      // this.client = manager;
      const res = await fn(manager);
      // this.manager = null;
      return res;
    });
  }
}