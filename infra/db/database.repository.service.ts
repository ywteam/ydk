import { Logger } from "@nestjs/common";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { DatabaseEntity } from "../../domains/entities/database.entity";
import { DatabaseOrder, DatabasePaginateResult, DatabaseRepository } from "../../domains/interfaces/db/repository.contract";
import { Repository, RepositoryOrderByInputs, RepositoryWhereInputs } from "./database.constants";
import { DatabaseUnitOfWorkServiceScoped } from "./database.unit-of-work.scoped.service";
import { DomainModel, dateRange } from "../../domains";

export abstract class DatabaseRepositoryService<
    TId = string | number, 
    TEntity = DatabaseEntity<TId> & DomainModel<TId>
> extends DatabaseRepository<TId, TEntity> 
{
    protected MAX_PAGE_SIZE: number = 10;
    protected logger: Logger = new Logger(this.constructor.name);
    protected isDatabaseError(error: any): boolean { return error instanceof PrismaClientValidationError; };
    
    currentUserId(context?: any): string | Promise<string> {
        throw new Error("Method not implemented.");
    }
    constructor(
        protected uow: DatabaseUnitOfWorkServiceScoped,
        protected repository: Repository<TId, TEntity>
    ) {
        super();
        // this.uow.adapter.userIdProvider = this.currentUserId.bind(this);
    }
    protected handleError(error: any): Error {
        if (this.isDatabaseError(error)) {
            this.logger.error(error);
        }
        return error;
    }
    protected pageSize(pageSize: number = 10): number {
        return Math.min(pageSize, this.MAX_PAGE_SIZE);
    }
    protected async getUserId(): Promise<string> {
        const userId = await this.uow.adapter.userIdProvider();
        !userId && this.logger.warn(`Query ${this.constructor.name} by unknown user`);
        !!userId && this.logger.log(`Query ${this.constructor.name} by ${userId}`);
        return userId;
    }
    toEntity(entity: any): TEntity { return entity as TEntity; }
    toEntities(entities: any[]): TEntity[] { return entities as TEntity[]; }
    getById(id: TId): Promise<TEntity | null> {
        try {
            return (<any>this.repository).findUnique({ where: { id } });
        } catch (error) {
            throw this.handleError(error);
        }
    }
    getSingle(query: Partial<TEntity> | RepositoryWhereInputs): Promise<TEntity | null> {
        try {
            return (<any>this.repository).findFirst({ where: query });
        } catch (error) {
            throw this.handleError(error);
        }
    }
    getAll(
        skip: number,
        offset: number,
        query: Partial<TEntity> | RepositoryWhereInputs,
        sort?: Partial<DatabaseOrder<TId, TEntity>> | Partial<DatabaseOrder<TId, TEntity>>[] | RepositoryOrderByInputs
    ): Promise<TEntity[]> {
        try {
            offset = this.pageSize(offset);
            const orderBy = Array.isArray(sort) ? { orderBy: sort } : sort;
            return (<any>this.repository).findMany({ skip, take: offset, where: query, orderBy}); //, include: { identity: true }
        } catch (error) {
            throw this.handleError(error);
        }
    }
    async paginate(
        page: number = 1,
        limit: number = 10,
        query: Partial<TEntity> | RepositoryWhereInputs,
        sort?: Partial<DatabaseOrder<TId, TEntity>> | Partial<DatabaseOrder<TId, TEntity>>[] | RepositoryOrderByInputs
    ): Promise<DatabasePaginateResult<TId, TEntity>> {
        try {
            limit = this.pageSize(limit);
            const count = await (<any>this.repository).count({ where: query });
            const pages = Math.ceil(count / limit);
            const data = await this.getAll((page - 1) * limit, limit, query, sort);
            return { pages, page, count, data };
        } catch (error) {
            throw this.handleError(error);
        }
    }
    protected validate(entity: TEntity, ...groups: string[]): Promise<void> {
        if(!!(<DomainModel<TId>>entity)?.throwIfInvalid) return (<DomainModel<TId>>entity).throwIfInvalid({ groups })
        this.logger.warn(`Entity ${this.constructor.name} has no validator`);
        return Promise.resolve();
    }
    async create(entity: TEntity): Promise<TEntity> {
        try {
            await this.validate(entity, 'create');
            delete (<any>entity).id;
            return await (<any>this.repository).create({ data: entity });
        } catch (error) {
            throw this.handleError(error);
        }
    }
    async update(entity: TEntity): Promise<TEntity | null> {
        try {
            await this.validate(entity, 'update');
            const { id } = entity as any;
            delete (<any>entity).updateBy;
            return await (<any>this.repository).update({ where: { id }, data: entity });
        } catch (error) {
            throw this.handleError(error);
        }
    }
    async path(id: TId, entity: Partial<TEntity>): Promise<TEntity | null> {
        try {
            const original = await this.getById(id);
            if (!original) {
                this.logger.warn(`Entity ${this.constructor.name} with id ${id} not found.`)
                return null;
            }
            delete (<any>entity).id;
            delete (<any>original).id;
            return (<any>this.repository).update({ where: { id }, data: {...original, ...entity} });
        } catch (error) {
            throw this.handleError(error);
        }
    }
    delete(id: TId): Promise<TEntity | null> {
        try {
            return this.update({ id, deletedAt: new Date() } as TEntity);
            // return (<any>this.repository).update({ where: { id }, data: { deletedAt: new Date()} });
        } catch (error) {
            throw this.handleError(error);
        }
    }
    async restore(id: TId): Promise<TEntity | null> {
        try {
            const entity = await (<any>this.repository).findFirst({ where: { id, deletedAt: { not: null } } });
            if (!entity) {
                this.logger.warn(`Entity ${this.constructor.name} with id ${id} not found.`)
                return null;
            }
            return (<any>this.repository).update({ where: { id, deletedAt: entity.deletedAt }, data: { ...entity, deletedAt: null } });
            // return this.update({ ...entity, deletedAt: null } as TEntity);
            // this.uow.adapter.$executeRaw`UPDATE ${this.tableName} SET deletedAt = NULL WHERE id = '${id}'`;            
            // const entity = await this.getById(id);
            // return await this.update({ ...entity, id, deletedAt: null } as TEntity);
        } catch (error) {
            throw this.handleError(error);
        }
    }
    remove(id: TId): Promise<TEntity | null> {
        try {
            return (<any>this.repository).delete({ where: { id } });
        } catch (error) {
            throw this.handleError(error);
        }
    }
    async exists(query: Partial<TEntity> | RepositoryWhereInputs): Promise<boolean> {
        try {
            const entity = await this.getSingle(query);
            return entity !== null;
        } catch (error) {
            throw this.handleError(error);
        }
    }
    async count(query: Partial<TEntity> | RepositoryWhereInputs): Promise<number> {
        try {
            return (<any>this.repository).count({ where: query });
        } catch (error) {
            throw this.handleError(error);
        }
    }
    trash(page: number = 1, query?: Partial<TEntity> | RepositoryWhereInputs): Promise<DatabasePaginateResult<TId, TEntity>> {
        try {
            query = { ...(query ?? {}), deletedAt: { not: null } };
            return this.paginate(page, this.MAX_PAGE_SIZE, query);
            // return (<any>this.repository).findMany({ where: { deletedAt: { not: null } } });
        } catch (error) {
            throw this.handleError(error);
        }
    }
    createdBy(byId: string, page: number = 1, query?: Partial<TEntity> | RepositoryWhereInputs): Promise<DatabasePaginateResult<TId, TEntity>> {
        try {
            query = { ...(query ?? {}), createdBy: byId }
            return this.paginate(page, this.MAX_PAGE_SIZE, query);
        } catch (error) {
            throw this.handleError(error);
        }
    }
    updatedBy(byId: string, page: number = 1, query?: Partial<TEntity> | RepositoryWhereInputs): Promise<DatabasePaginateResult<TId, TEntity>> {
        try {
            query = { ...(query ?? {}), updatedBy: byId }
            return this.paginate(page, this.MAX_PAGE_SIZE, query);
        } catch (error) {
            throw this.handleError(error);
        }
    }
    deletedBy(byId: string, page: number = 1, query?: Partial<TEntity> | RepositoryWhereInputs): Promise<DatabasePaginateResult<TId, TEntity>> {
        try {
            query = { ...(query ?? {}), updatedBy: byId, deletedAt: { not: null } }
            return this.paginate(page, this.MAX_PAGE_SIZE, query);
        } catch (error) {
            throw this.handleError(error);
        }
    }
    async createdByMe(page: number = 1, query?: Partial<TEntity> | RepositoryWhereInputs): Promise<DatabasePaginateResult<TId, TEntity>> {
        try {
            const userId = await this.getUserId();
            return this.createdBy(userId, page, query);
        } catch (error) {
            throw this.handleError(error);
        }
    }
    async updatedByMe(page: number = 1, query?: Partial<TEntity> | RepositoryWhereInputs): Promise<DatabasePaginateResult<TId, TEntity>> {
        try {
            const userId = await this.getUserId();
            return this.updatedBy(userId, page, query);
        } catch (error) {
            throw this.handleError(error);
        }
    }
    createdBetween(from: Date, to?: Date, page: number = 1, query?: Partial<TEntity> | RepositoryWhereInputs): Promise<DatabasePaginateResult<TId, TEntity>> {
        try {
            const range = dateRange(from, to);
            query = { ...(query ?? {}), createdAt: { gte: range.from, lte: range.to } }
            return this.paginate(page, this.MAX_PAGE_SIZE, query);
        } catch (error) {
            throw this.handleError(error);
        }
    }
    updatedBetween(from: Date, to?: Date, page: number = 1, query?: Partial<TEntity> | RepositoryWhereInputs): Promise<DatabasePaginateResult<TId, TEntity>> {
        try {
            const range = dateRange(from, to);
            query = { ...(query ?? {}), updatedAt: { gte: range.from, lte: range.to } }
            return this.paginate(page, this.MAX_PAGE_SIZE, query);
        } catch (error) {
            throw this.handleError(error);
        }
    }
    deletedBetween(from: Date, to?: Date, page: number = 1, query?: Partial<TEntity> | RepositoryWhereInputs): Promise<DatabasePaginateResult<TId, TEntity>> {
        try {
            const range = dateRange(from, to);
            query = { ...(query ?? {}), deletedAt: { gte: range.from, lte: range.to } }
            return this.paginate(page, this.MAX_PAGE_SIZE, query);
        } catch (error) {
            throw this.handleError(error);
        }
    }
    createdToday(page: number = 1, query?: Partial<TEntity> | RepositoryWhereInputs): Promise<DatabasePaginateResult<TId, TEntity>> {
        try {
            const { from, to } = dateRange();
            return this.createdBetween(from, to, page, query);
        } catch (error) {
            throw this.handleError(error);
        }
    }
    updatedToday(page: number = 1, query?: Partial<TEntity> | RepositoryWhereInputs): Promise<DatabasePaginateResult<TId, TEntity>> {
        try {
            const { from, to } = dateRange();
            return this.updatedBetween(from, to, page, query);
        } catch (error) {
            throw this.handleError(error);
        }
    }
    deletedToday(page: number = 1, query?: Partial<TEntity> | RepositoryWhereInputs): Promise<DatabasePaginateResult<TId, TEntity>> {
        try {
            const { from, to } = dateRange();
            return this.deletedBetween(from, to, page, query);
        } catch (error) {
            throw this.handleError(error);
        }
    }
}