import { Business } from '@src/entities/business.entity';
import { CreateBusinessPayload } from '@src/validators/business.validator';
import { plainToInstance } from 'class-transformer';
import { EntityManager } from 'typeorm';
import { BaseService } from './base.service';

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
}

