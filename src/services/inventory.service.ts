import { CreateInventoryPayload } from '@src/validators/inventory.validator';
import { BaseService } from './base.service';
import { plainToInstance } from 'class-transformer';
import { Inventory } from '@src/entities/inventory.entity';

export default class InventoryService extends BaseService {

  public async createInventory(data: CreateInventoryPayload) {
    const result = await this.db.query(
      `
        INSERT INTO inventory
          (product_id, price_per_unit, arrived_at, quantity, created_at, updated_at)
        VALUES 
          ($1, $2, $3, $4, NOW(), NOW())
        RETURNING 
          id,
          product_id as "productId"
          price_per_unit as "pricePerUnit",
          arrived_at as "arrivedAt",
          quantity as "quantity",
          created_at as "createdAt",
          updated_at as "updatedAt",
          deleted_at as "deletedAt"
      `,
      [data.product_id, data.price_per_unit, data.arrivedAt, data.quantity],
    );
    return plainToInstance(Inventory, result[0]);
  }

  public async getProductInventory(productId: number) {
    const result: unknown[] = await this.db.query(
      `
        SELECT 
          i.id,
          i.product_id as "productId"
          i.price_per_unit as "pricePerUnit",
          i.arrived_at as "arrivedAt",
          i.quantity as "quantity",
          i.created_at as "createdAt",
          i.updated_at as "updatedAt",
          i.deleted_at as "deletedAt"
        FROM inventory i
        WHERE i.product_id=$1
      `, [productId],
    );
    return plainToInstance(Inventory, result);
  }
}