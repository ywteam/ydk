import { Logger } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { Prisma } from "@prisma/client";
import { APP_ROLE, DatabaseEntity } from "../../../domain";
import { DatabaseModule } from "../database.module";
import { DatabaseUnitOfWorkServiceScoped } from "../database.unit-of-work.scoped.service";
import { DatabaseTestsRepository } from "../repositories/test.repository";
import { DATABASE_CLIENT_SCOPED_TOKEN } from "../database.constants";
class TestEntity extends DatabaseEntity<string> {
    // id: string;
    name: string;
    description?: string;
    constructor(data: Partial<TestEntity>) {
        super(data);
        // this.id = data.id;
        this.name = data.name;
        this.description = data.description;
    }
}
class TestRepository extends DatabaseTestsRepository<string, TestEntity> { }
describe('Infra Database Tests', () => {
    describe('TestRepository', () => {
        let unitOfWork: DatabaseUnitOfWorkServiceScoped;
        let repository: TestRepository;
        let entity = new TestEntity({ name: 'test' });
        beforeAll(async () => {
            const app = await Test.createTestingModule({
                imports: [
                    DatabaseModule
                ]
            })
                .setLogger(new Logger(TestRepository.name))
                .compile();
            unitOfWork = await app.resolve<DatabaseUnitOfWorkServiceScoped>(DATABASE_CLIENT_SCOPED_TOKEN);
            repository = new TestRepository(unitOfWork);
        });
        it('service should be defined', () => {
            expect(unitOfWork).toBeDefined();
        })
        describe('commom tests', () => {
            it('should be able to create a test', async () => {
                entity = await repository.create(entity);
                expect(entity).toBeDefined();
                expect(entity?.id).toBeDefined();
                expect(entity.name).toBe('test');
                expect(entity.createdBy).toBeDefined();
            });
            it('should be able to get a test by id', async () => {
                !entity?.id && it.skip('should be able to get a test by id');
                entity = await repository.getById(entity.id);
                expect(entity).toBeDefined();
            });
            it('should be able to get all tests', async () => {
                const entities = await repository.getAll(0, 10, {});
                expect(entities).toBeDefined();
                expect(entities.length).toBeGreaterThan(0);
            });
            it('should be able to get all tests with pagination', async () => {
                const entities = await repository.paginate(1, 10, {});
                expect(entities).toBeDefined();
                expect(entities.count).toBeGreaterThan(0);
                expect(entities.pages).toBeGreaterThan(0);
                expect(entities.page).toBeGreaterThan(0);
                expect(entities.data.length).toBeGreaterThan(0);
            });
            it('should be able to get a test by query', async () => {
                entity = await repository.getSingle({ name: 'test' });
                expect(entity).toBeDefined();
            });
            it('should be able to check if a test exists', async () => {
                const exists = await repository.exists({ name: 'test' });
                expect(exists).toBeTruthy();
            });
            it('should be able to count tests', async () => {
                const count = await repository.count({ name: 'test' });
                expect(count).toBeGreaterThan(0);
            });
            it('should be able to query createdBy', async () => {
                !entity.createdBy && it.skip('should be able to query createdBy');
                const entities = await repository.createdBy(entity.createdBy, 1, {});
                expect(entities).toBeDefined();
                expect(entities.count).toBeGreaterThan(0);
                expect(entities.pages).toBeGreaterThan(0);
                expect(entities.page).toBeGreaterThan(0);
                expect(entities.data.length).toBeGreaterThan(0);
            });
            it('should be able to query createdByMe', async () => {
                const entities = await repository.createdByMe(1);
                expect(entities).toBeDefined();
                expect(entities.count).toBeGreaterThan(0);
                expect(entities.pages).toBeGreaterThan(0);
                expect(entities.page).toBeGreaterThan(0);
                expect(entities.data.length).toBeGreaterThan(0);
            });
            it('should be able to query createdBetween', async () => {
                const now = new Date();
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
                const entities = await repository.createdBetween(today, now);
                expect(entities).toBeDefined();
                expect(entities.count).toBeGreaterThan(0);
                expect(entities.pages).toBeGreaterThan(0);
                expect(entities.page).toBeGreaterThan(0);
                expect(entities.data.length).toBeGreaterThan(0);
            })
            it('should be able to query createdToday', async () => {
                const entities = await repository.createdToday(1);
                expect(entities).toBeDefined();
                expect(entities.count).toBeGreaterThan(0);
                expect(entities.pages).toBeGreaterThan(0);
                expect(entities.page).toBeGreaterThan(0);
                expect(entities.data.length).toBeGreaterThan(0);
            })
            it('should be able to update a test', async () => {
                entity = await repository.update({ ...entity, name: 'test2' } as TestEntity);
                expect(entity).toBeDefined();
                expect(entity?.name).toBe('test2');
            });
            it('should be able to patch a test', async () => {
                !entity?.id && it.skip('should be able to patch a test');
                entity = await repository.path(entity.id, { ...entity, name: 'test3' });
                expect(entity).toBeDefined();
                expect(entity?.name).toBe('test3');
            });
            it('should be able to query updatedBy', async () => {
                !entity.updatedBy && it.skip('should be able to query updatedBy');
                const entities = await repository.updatedBy(entity.updatedBy, 1, {});
                expect(entities).toBeDefined();
                expect(entities.count).toBeGreaterThan(0);
                expect(entities.pages).toBeGreaterThan(0);
                expect(entities.page).toBeGreaterThan(0);
                expect(entities.data.length).toBeGreaterThan(0);
            });
            it('should be able to query updatedByMe', async () => {
                const entities = await repository.updatedByMe(1, {});
                expect(entities).toBeDefined();
                expect(entities.count).toBeGreaterThan(0);
                expect(entities.pages).toBeGreaterThan(0);
                expect(entities.page).toBeGreaterThan(0);
                expect(entities.data.length).toBeGreaterThan(0);
            });
            it('should be able to query updatedBetween', async () => {
                const date = new Date();
                const today = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
                const entities = await repository.updatedBetween(today, new Date(), 1, {});
                expect(entities).toBeDefined();
                expect(entities.count).toBeGreaterThan(0);
                expect(entities.pages).toBeGreaterThan(0);
                expect(entities.page).toBeGreaterThan(0);
                expect(entities.data.length).toBeGreaterThan(0);
            })
            it('should be able to query updatedToday', async () => {
                const entities = await repository.updatedToday(1, {});
                expect(entities).toBeDefined();
                expect(entities.count).toBeGreaterThan(0);
                expect(entities.pages).toBeGreaterThan(0);
                expect(entities.page).toBeGreaterThan(0);
                expect(entities.data.length).toBeGreaterThan(0);
            })
            it('should be able to delete a test', async () => {
                !entity?.id && it.skip('should be able to delete a test');
                entity = await repository.delete(entity.id);
                expect(entity).toBeDefined();
                expect(entity?.deletedAt).toBeDefined();
            });
            it('should be secure to test is deleted', async () => {
                !entity?.id && it.skip('should be able to get a test by id');
                const empty = await repository.getById(entity.id);
                expect(empty).toBeNull();
            });
            it('should be able to get all deleted tests', async () => {
                const entities = await repository.trash();
                expect(entities).toBeDefined();
                expect(entities.count).toBeGreaterThan(0);
            });
            it('should be able to query deletedBetween', async () => {
                const date = new Date();
                const today = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
                const entities = await repository.deletedBetween(today, new Date(), 1, {});
                expect(entities).toBeDefined();
                expect(entities.count).toBeGreaterThan(0);
            })
            it('should be able to query deletedToday', async () => {
                const entities = await repository.deletedToday(1, {});
                expect(entities).toBeDefined();
                expect(entities.count).toBeGreaterThan(0);
            })
            it('should be able to restore a test', async () => {
                !entity?.id && it.skip('should be able to restore a test');
                entity = await repository.restore(entity.id);
                expect(entity).toBeDefined();
                expect(entity?.deletedAt).toBeNull();
            });
            it('should be able to get the test', async () => {
                !entity?.id && it.skip('should be able to get a test by id');
                entity = await repository.getById(entity.id);
                expect(entity).toBeDefined();
                expect(entity?.deletedAt).toBeNull();
            })
            it('should be able to remove a test', async () => {
                !entity?.id && it.skip('should be able to remove a test');
                entity = await repository.remove(entity.id);
                expect(entity).toBeDefined();
            });
            it('should be secure to test is removed', async () => {
                !entity?.id && it.skip('should be able to get a test by id');
                const empty = await repository.getById(entity.id);
                expect(empty).toBeNull();
            })
            it('should be secure to test is not in trash', async () => {
                const entities = await repository.trash();
                expect(entities).toBeDefined();
                expect(entities.count).toBe(0);
            })
        })
        describe('pagination tests', () => {
            const tests = [];
            it('should be able to create 100 tests', async () => {
                for (let i = 0; i < 10; i++) {
                    const result = await repository.create(new TestEntity({ name: `test_${i}` }));
                    expect(result).toBeDefined();
                    tests.push(result);
                }
                expect(tests).toBeDefined();
                expect(tests.length).toBe(10);
            })
            it('should be able to get all tests with pagination', async () => {
                const entities = await repository.paginate(1, 1, {});
                expect(entities).toBeDefined();
                expect(entities.count).toBe(10);
                expect(entities.pages).toBe(10);
                expect(entities.page).toBe(1);
                expect(entities.data.length).toBe(1);
            });
            it('should be able to get all pages', async () => {
                let page = 1;
                do {
                    const entities = await repository.paginate(page, 1, {});
                    expect(entities).toBeDefined();
                    expect(entities.count).toBe(10);
                    expect(entities.pages).toBe(10);
                    expect(entities.page).toBe(page);
                    expect(entities.data.length).toBe(1);
                    page++;
                    if (entities.data.length < 10) break;
                } while (page <= 10);
            }, 20 * 1000)
            it('should be able to get all tests with pagination and query', async () => {
                const entities = await repository.paginate(1, 1, { name: { contains: 'test' } });
                expect(entities).toBeDefined();
                expect(entities.count).toBe(10);
                expect(entities.pages).toBe(10);
                expect(entities.page).toBe(1);
                expect(entities.data.length).toBe(1);
            });
            it('should be able to remove all tests', async () => {
                for (const test of tests) {
                    expect(test).toBeDefined();
                    await repository.remove(test.id);
                }
            }, 10 * 1000);
        })
    });
    describe('Seed', () => {
        let unitOfWork: DatabaseUnitOfWorkServiceScoped;
        let repository: TestRepository;
        beforeAll(async () => {
            const app = await Test.createTestingModule({
                imports: [
                    DatabaseModule
                ]
            })
                .setLogger(new Logger(TestRepository.name))
                .compile();
            unitOfWork = await app.resolve<DatabaseUnitOfWorkServiceScoped>(DATABASE_CLIENT_SCOPED_TOKEN);
            repository = new TestRepository(unitOfWork);
        });
        it('should be able to seed grupos', async () => {
            function capitalize(s: string): string {
                const str = s.toLowerCase();
                return str.charAt(0).toUpperCase() + str.slice(1);
            }
            const groupsRepository = unitOfWork.adapter.groups;
            const groups = Object.entries(APP_ROLE)
                .map(([key, value]) => ({
                    id: Number(value),
                    name: Buffer.from(key).toJSON().data.join('.'),
                    description: `${capitalize(key)} Group`,
                    system: true
                }))
                .filter(group => group.id > 0) as Prisma.GroupsCreateManyInput[];
            const created = await groupsRepository.createMany({
                data: [...groups],
                skipDuplicates: true,
            });
            expect(created).toBeDefined();
        })
    })
});