import { Global, Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { APP_ROLE } from '../../domains';
import { PROVIDERS } from './database.providers';
import { DatabaseUnitOfWorkServiceScoped } from './database.unit-of-work.scoped.service';
import { DatabaseUnitOfWorkService } from './database.unit-of-work.service';
import { DATABASE_CLIENT_SCOPED_TOKEN } from './database.constants';
function capitalize(s: string): string {
  const str = s.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const SERVICES = [
  // DatabaseUnitOfWorkService,
  // DatabaseUnitOfWorkServiceScoped
];
@Global()
@Module({
  providers: [...PROVIDERS],
  exports: [...PROVIDERS],
})
export class DatabaseModule implements OnModuleInit {
  private logger: Logger = new Logger(DatabaseModule.name);
  constructor(@Inject(DATABASE_CLIENT_SCOPED_TOKEN) private readonly uow: DatabaseUnitOfWorkServiceScoped) { }
  async onModuleInit() {
    this.logger.log('Initializing database module...');
    await this.seed();
  }
  private async seed(): Promise<void> {
    this.logger.log('Seeding database...');
    const results = await Promise.all([
      this.seedGroups()
    ]);
    this.logger.log(`Seeding database completed. ${results.length} seeders executed.`);
  }
  private async seedGroups(): Promise<{ count: number }> {
    this.logger.log('Seeding database groups ...');
    const groupsRepository = this.uow.adapter.groups;
    const groups = Object.entries(APP_ROLE)
      .map(([key, value]) => ({
        id: Number(value),
        name: Buffer.from(key).toJSON().data.join('.'),
        description: `${capitalize(key)} Group`,
        system: true
      }))
      .filter(group => group.id > 0) as Prisma.GroupsCreateManyInput[];

    return await groupsRepository.createMany({
      data: [...groups],
      skipDuplicates: true,
    });
  }
  // private async seedUsers(): Promise<{ count: number }> {}
}