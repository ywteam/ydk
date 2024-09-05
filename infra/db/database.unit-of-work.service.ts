import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { BehaviorSubject } from 'rxjs';
import { AuditLogExtension, AuditLogUserProvider, LoggingExtension, SoftDeleteExtension } from './extensions';

function databaseUnitOfWorkServiceFactory(userIdProvider: AuditLogUserProvider) {
  return new DatabaseUnitOfWorkService(userIdProvider)
    .$extends(AuditLogExtension(userIdProvider))
    .$extends(SoftDeleteExtension)
    .$extends(LoggingExtension)
}
export type DatabaseClientService = ReturnType<typeof databaseUnitOfWorkServiceFactory> & DatabaseUnitOfWorkService;
export type DatabaseEvent = Prisma.LogEvent | Prisma.QueryEvent;
// @Injectable()
export class DatabaseUnitOfWorkService extends PrismaClient<
  Prisma.PrismaClientOptions, 'query' | 'info' | 'warn' | 'error'
>
  implements OnModuleInit, OnModuleDestroy {
  private logger: Logger = new Logger(DatabaseUnitOfWorkService.name);
  private events: BehaviorSubject<DatabaseEvent | null> = new BehaviorSubject<DatabaseEvent | null>(null);
  public get $events() { return this.events.asObservable(); }
  constructor(public userIdProvider: AuditLogUserProvider) {
    super({
      log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "error" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" }
      ]
    });
    this.logger.log(`Database engine version: ${Prisma.prismaVersion.client}`);
    this.$on('error', (e: Prisma.LogEvent) => {
      this.logger.error(e);
      this.events.next(e);
    });
    this.$on('warn', (e: Prisma.LogEvent) => {
      this.logger.warn(e);
      this.events.next(e);
    });
    this.$on('info', (e: Prisma.LogEvent) => {
      this.logger.log(e);
      this.events.next(e);
    });
    this.$on('query', (e: Prisma.QueryEvent) => {
      this.logger.debug(JSON.stringify(e));
      this.events.next(e);
    });
  }
  static create(userIdProvider: AuditLogUserProvider): DatabaseClientService {
    const service = databaseUnitOfWorkServiceFactory(userIdProvider) as DatabaseClientService;
    service.userIdProvider = userIdProvider;
    // service.$on('error', (e: Prisma.ErrorEvent) => {});
    // service.$on('warn', (e: Prisma.ErrorEvent) => {});
    // service.$on('info', (e: Prisma.InfoEvent) => {});
    // // @ts-ignore
    // service.$on('query', (e: Prisma.QueryEvent) => {
    //   console.log('Query: ' + e.query)
    //   console.log('Params: ' + e.params)
    //   console.log('Duration: ' + e.duration + 'ms')
    // });
    return service;
  }
  async onModuleInit() {
    this.logger.log('Initializing');
    await this.$connect();
  }
  async onModuleDestroy() {
    this.logger.log('Destroying');
    await this.$disconnect();
  }
}