import { Business } from '@src/entities/business.entity';
import { CreateBusinessPayload } from '@src/validators/business.validator';
import { plainToInstance } from 'class-transformer';
import { EntityManager } from 'typeorm';
import { BaseService } from './base.service';
import { evaluateWhereClause } from '@src/util/evaluateWhereClause';

export type GetBusinessWhere = {
	owner_id: number;
	name: string;
	city: string;
  country: string,
  email: string
}

type CreateBusinessData = CreateBusinessPayload['business'] & { owner_id: number }

export default class BusinessService extends BaseService {
  constructor(dbManager: EntityManager) {
    super(dbManager);
  }

  public async create(data: CreateBusinessData): Promise<Business> {
    const [business] = await this.db.query(`
    INSERT INTO businesses (name, email, contact_no, city, country, postal_code, address_line_1, address_line_2, owner_id, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
    RETURNING 
      id,
      name,
      email,
      contact_no as "contactNo",
      postal_code as "postalCode",
      address_line_1 as  "addressLine1",
      address_line_2 as "addressLine2",
      owner_id as "ownerId",
      created_at as "createdAt",
      updated_at as "updatedAt",
      deleted_at as "deletedAt"
  `, [data.name, data.email, data.contactNo, data.city, data.country, data.postalCode, data.addressLine1, data?.addressLine2 ?? '', data.owner_id]);
    return plainToInstance(Business, business);
  } 


  public async findByOwner(owner_id: number): Promise<Business | null> {
    const result = await this.db.query(`
      SELECT 
        b.id as id,
        b.name as name,
        b.email as email,
        b.city as city,
        b.country as country,
        b.address_line_1 as "addressLine1",
        b.address_line_2 as "addressLine2",
        b.postal_code as "postalCode",
        b.owner_id as "ownerId",
        b.created_at as "createdAt",
        b.updated_at as "updatedAt",
        b.deleted_at as "deletedAt"
      FROM businesses b
      WHERE b.owner_id = $1 AND b.deleted_at IS NULL
      LIMIT 1;
    `, [owner_id]);

    if (result.length === 0) return null;
    return plainToInstance(Business, result[0]);
  }

  public findAll = (where?: Partial<GetBusinessWhere>) => {
    let result = `
    SELECT 
        b.id as id,
        b.name as name,
        b.email as email,
        b.city as city,
        b.country as country,
        b.address_line_1 as "addressLine1",
        b.address_line_2 as "addressLine2",
        b.postal_code as "postalCode",
        b.owner_id as "ownerId",
        b.created_at as "createdAt",
        b.updated_at as "updatedAt",
        b.deleted_at as "deletedAt"
      FROM businesses b`;
      let whereExp = evaluateWhereClause(where, 'b');
      if (whereExp !== '') { 
        whereExp += ' AND ';
      }
      whereExp += 'b.deleted_at IS NULL';
      result += ` WHERE ${whereExp}`;
      return result;
    };
  


  public async findById (id:number) {
    const result = await this.db.query(`
    SELECT 
      b.id as id,
      b.name as name,
      b.email as email,
      b.city as city,
      b.country as country,
      b.address_line_1 as "addressLine1",
      b.address_line_2 as "addressLine2",
      b.postal_code as "postalCode",
      b.owner_id as "ownerId",
      b.created_at as "createdAt",
      b.updated_at as "updatedAt",
      b.deleted_at as "deletedAt"
    FROM businesses b
    WHERE b.id = $1 AND b.deleted_at IS NULL
    LIMIT 1;
  `, [id]);

  if (result.length === 0) return null;
  return plainToInstance(Business, result[0]);
}
      

  public async update(id: number) {
    const result = await this.db.query(`
    UPDATE businesses
       SET b.name = name,
       SET b.email = email,
       SET b.city = city,
       SET b.country = country,
       SET b.address_line_1 = "addressLine1",
       SET b.address_line_2 = "addressLine2",
       SET b.postal_code = "postalCode",
       SET b.created_at = "createdAt",
       SET b.updated_at = "updatedAt",
       SET b.deleted_at = "deletedAt"
       WHERE b.id = $1 AND b.deleted_at IS NULL
    `[id])

    if (result.length === 0) return null;
    return plainToInstance(Business, result[0]);
  }

  public async delete(id: number) {
    const result = await this.db.query(`
    UPDATE businesses
    SET b.deleted_at = NOW()
    WHERE b.id = $1
    `[id])

    if (result.length === 0) return null;
    return plainToInstance(Business, result[0]);
  }
}

