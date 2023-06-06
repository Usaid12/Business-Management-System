import db from '@src/database';
import { BaseService } from './base.service';
import { Product } from '@src/entities/product.entity';
import { plainToInstance } from 'class-transformer';
import { CreateProductPayload } from '@src/validators/product.validator';

export default class ProductService extends BaseService {
  public async create(data: CreateProductPayload): Promise<Product> {
    const [product] = await db.query(
      `INSERT INTO 
        categories (name, description, price,created_at, updated_at) 
        VALUES ($1, $2, $3, NOW(), NOW()) 
      RETURNING 
        id,
        name, 
        description,
        price,
        created_at as "createdAt", 
        updated_at as "updatedAt", 
        deleted_at as "deletedAt"
      `,
      [data.name, data.description, data.price],
    );
    return plainToInstance(Product, product);
  }
}