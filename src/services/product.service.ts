import db from '@src/database';
import { BaseService } from './base.service';
import { Product } from '@src/entities/product.entity';
import { plainToInstance } from 'class-transformer';
import { CreateProductPayload } from '@src/validators/product.validator';
import { evaluateWhereClause } from '@src/util/evaluateWhereClause';
import { ProductImages } from '@src/entities/product_images.entity';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import logger from 'jet-logger';


interface CreateProductData extends CreateProductPayload {
  business_id: number;
  thumbnail: string;
}

type ProductWhere = Partial<{
  id: number;
  name: string;
  price: number;
  category_id: number;
  business_id: number
}>

export default class ProductService extends BaseService {
  public async create(data: CreateProductData): Promise<Product> {
    const [product] = await db.query(
      `INSERT INTO 
        products (name, description, price, thumbnail, business_id, category_id, created_at, updated_at) 
        VALUES ($1, $2, $3, $6, $4, $5, NOW(), NOW()) 
      RETURNING 
        id,
        name, 
        description,
        price,
        thumbnail,
        business_id as "businessId",
        category_id as "categoryId",
        created_at as "createdAt", 
        updated_at as "updatedAt", 
        deleted_at as "deletedAt"
      `,
      [data.name, data.description, data.price, data.business_id, data.category_id, data.thumbnail],
    );
    return plainToInstance(Product, product);
  }

  public async findAll(where: ProductWhere){
    const data: Array<any> = await this.db.query(
      `SELECT 
        p.id as "id",
        p.name as "name",
        p.description as "description",
        p.business_id as "businessId",
        p.category_id as "categoryId",
        p.created_at as "createdAt",
        p.updated_at as "updatedAt",
        p.deleted_at as "deletedAt"
      FROM products p
      WHERE p.deleted_at IS NULL AND p.business_id=$1`,[where.business_id],
    );
    return plainToInstance(Product, data);
  }

  private makeSelectProductQuery = (where?: ProductWhere) => {
    let query = `SELECT 
    p.id as "id",
    p.name as "name",
    p.description as "description",
    p.price as "price",
    p.thumbnail as "thumbnail",
    p.business_id as "businessId",
    p.category_id as "categoryId",
    p.created_at as "createdAt",
    p.updated_at as "updatedAt",
    p.deleted_at as "deletedAt"
  FROM products p`;
    let whereExp = evaluateWhereClause(where, 'p');
    if (whereExp !== '') { 
      whereExp += ' AND ';
    }
    whereExp += 'p.deleted_at IS NULL';
    query += ` WHERE ${whereExp}`;
    return query;
  };

  public async findOne(where?: ProductWhere): Promise<Product | null> {
    let query = this.makeSelectProductQuery(where);
    query += ' LIMIT 1;';
    const result = await this.db.query(query);
    if (result.length === 0) return null;
    return plainToInstance(Product, result[0]);
  }

  public async findById(id: number){
    return await this.findOne({ id });
  }

  public async addImages(images: string[], product_id: number) {
    const values = images.map(image => `('${image}', ${product_id})`).join(', ');
    const result: any[] = await this.db.query(`
      INSERT INTO product_images (image_url, product_id) VALUES ${values} 
      RETURNING 
        id, 
        image_url as "imageUrl", 
        product_id as "productId", 
        created_at as "createdAt", 
        updated_at as "updatedAt", 
        deleted_at as "deletedAt";
    `);
    return plainToInstance(ProductImages, result);
  }

  public async getImages(productId: number) {
    const result: any[] = await this.db.query(
      ` SELECT 
          pi.id, 
          pi.image_url as "imageUrl", 
          pi.product_id as  "productId",
          pi.created_at as "createdAt", 
          pi.updated_at as "updatedAt", 
          pi.deleted_at as "deletedAt"
        FROM product_images pi
        WHERE pi.product_id = $1 AND pi.deleted_at IS NULL;
      `, [productId]);
    return plainToInstance(ProductImages, result);
  }

  public validateId(id: string) {
    const productId = parseInt(id, 10);
    if (isNaN(productId)) throw new RouteError(HttpStatusCodes.BAD_REQUEST, 'productId can only be an integer');
    return productId;
  }
}