import { plainToInstance } from 'class-transformer';
import { BaseService } from './base.service';
import { Cart } from '@src/entities/cart.entity';
import { evaluateWhereClause } from '@src/util/evaluateWhereClause';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

interface CartItem {
  user_id: number;
  product_id: number;
}

type CartWhere = Partial<CartItem>;

export default class CartService extends BaseService {
  public async addItem(data: CartItem) {
    const [cartItem] = await this.db.query(`
      INSERT INTO carts (user_id, product_id, quantity, created_at, updated_at) 
      VALUES ($1, $2, 1, NOW(), NOW())
      RETURNING
        id,
        user_id as "userId",
        product_id as "productId",
        quantity,
        created_at as "createdAt",
        updated_at as "updatedAt",
        deleted_at as "deletedAt"
    `, [data.user_id, data.product_id]);
    return plainToInstance(Cart, cartItem);
  }

  public async findItems(where: CartWhere) {
    const query = this.makeSelectQuery(where);
    const cartItems: unknown[] = await this.db.query(query);
    return plainToInstance(Cart, cartItems);
  }

  private createWhereClause(where: CartWhere) {
    let whereClause = evaluateWhereClause(where, 'c');
    if (whereClause !== '') {
      whereClause += ' AND ';
    }
    whereClause += 'c.deleted_at IS NULL';
    return whereClause;
  }

  private makeSelectQuery(where: CartWhere) {
    const whereClause = this.createWhereClause(where);
    const query = `SELECT 
      c.id,
      c.user_id as "userId",
      c.product_id as "productId",
      c.quantity as "quantity",
      c.created_at as "createdAt",
      c.updated_at as "updatedAt",
      c.deleted_at as "deletedAt"
    FROM carts c
    WHERE ${whereClause}`;
    return query;
  }

  public async findItem(where: CartWhere = {}) {
    const query = this.makeSelectQuery(where);
    const cartItems: unknown[] = await this.db.query(query);
    if (cartItems.length === 0) return null;
    return plainToInstance(Cart, cartItems[0]);
  }

  public async validateCartIds(cartIds: number[], userId: number) {
    const cartsData: unknown[] = await this.db.query(`
    SELECT 
    c.id,
    c.user_id as "userId",
    c.product_id as "productId",
    p.price as "price",
    c.quantity as "quantity",
    c.created_at as "createdAt",
    c.updated_at as "updatedAt",
    c.deleted_at as "deletedAt"
  FROM carts c
  INNER JOIN products p ON p.id = c.product_id
  WHERE c.id IN (${cartIds.map(id => `'${id}'`).join(', ')}) AND c.user_id = $1
    `, [userId]);
    if (cartsData.length !== cartIds.length) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Invalid cartIds');
    }
    return cartsData.map(data => {
      return {
        ...plainToInstance(Cart, data),
        price: (data as any).price as number,
      };
    });
  }

  public async deleteItem(where: Partial<Omit<CartItem, 'price'> & { id: number }>) {
    const whereClause = evaluateWhereClause(where);
    await this.db.query(`
      UPDATE carts SET deleted_at = NOW()
      WHERE ${whereClause};
    `);
  }

  public async itemsCount(where: CartWhere) {
    const whereClause = this.makeSelectQuery(where);
    const result = await this.db.query(`
      SELECT count(c.id) as "cartItemsCount" FROM carts c
      WHERE ${whereClause}
    `);
    if (result.length === 0) return 0;
    else return parseInt(result[0].cartItemsCount || '0', 10);
  }

  public async updateItemQuantity(where: CartWhere, quantity: number) {
    const whereClause = this.createWhereClause(where);
    await this.db.query(`
      UPDATE carts c
      SET quantity = ${quantity} 
      WHERE ${whereClause};
    `);
    const item = await this.findItem(where);
    if (!item) throw new Error('Some unexpected error occured');
    return item;
  }
}