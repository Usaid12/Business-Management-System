import { evaluateWhereClause } from '@src/util/evaluateWhereClause';
import { CreateCategoryPayload } from '@src/validators/category.validator';
import { BaseService } from './base.service';
import { EntityManager } from 'typeorm';
import { Category } from '@src/entities/category.entity';
import { plainToInstance } from 'class-transformer';


export type GetCategoryWhere = {
	id: number;
	name: string;
	parent_id: number | null
}

export default class CategorySerivce extends BaseService {
  constructor(dbManager: EntityManager) {
    super(dbManager);
  }

  public async create(data: CreateCategoryPayload): Promise<Category> {
    const [category] = await this.db.query(
      `INSERT INTO 
        categories (name, parent_id, created_at, updated_at) 
        VALUES ($1, $2, NOW(), NOW()) 
      RETURNING 
        id,
        name, 
        parent_id as "parentId", 
        created_at as "createdAt", 
        deleted_at as "deletedAt", 
        updated_at as "updatedAt"
      `,
      [data.name, data?.parentId ?? null],
    );
    return plainToInstance(Category, category);
  }

  private makeSelectCategoryQuery = (where?: Partial<GetCategoryWhere>) => {
    let query = `SELECT 
    c.id as "id", 
    c.name as "name", 
    c.parent_id as "parentId", 
    c.created_at as "createdAt",
    c.updated_at as "updatedAt", 
    c.deleted_at as "deletedAt" 
  FROM categories c`;
    let whereExp = evaluateWhereClause(where, 'c');
    if (whereExp !== '') { 
      whereExp += ' AND ';
    }
    whereExp += 'c.deleted_at IS NULL';
    query += ` WHERE ${whereExp}`;
    return query;
  };

  public async findOne(where?: Partial<GetCategoryWhere>): Promise<Category | null> {
    let query = this.makeSelectCategoryQuery(where);
    query += ' LIMIT 1';
    const result = await this.db.query(query);
    if (result.length === 0) return null;
    return plainToInstance(Category, result[0]);
  }

  public async findById(id: number){
    return await this.findOne({ id });
  }

  public async findAll(where?: Partial<GetCategoryWhere>): Promise<Array<Category>>{
    const query = this.makeSelectCategoryQuery(where);
    const result: Array<unknown> = await this.db.query(query);
    return plainToInstance(Category, result);
  }

  public async findChildrens(parent_id: number): Promise<Array<Category>> {
    return await this.findAll({ parent_id });
  }
}