import { CreateOrderPayload } from '@src/validators/order.validator';
import { BaseService } from './base.service';
import { plainToInstance } from 'class-transformer';
import { Order } from '@src/entities/order.entity';
import { ORDER_ITEM_TABLE } from '@src/constants/db';
import { OrderItem } from '@src/entities/order_items.entity';

type OrderData = {
  userId: number;
  totalPrice: number;
  status: string;
} & Omit<CreateOrderPayload, 'cart_ids'>

type OrderItemData = {
  order_id: number;
  product_id: number;
  quantity: number;
  price_per_unit: number;
  sub_total_price: number;
}

export default class OrderService extends BaseService {
  public async createOrder(data: OrderData) {
    const [order] = await this.db.query(`
      INSERT INTO orders 
        (user_id, status, total_price, created_at, updated_at)  
      VALUES
        ($1, $3, $2, NOW(), NOW())
      RETURNING
        id, 
        user_id as "userId",
        status,
        total_price as "totalPrice",
        created_at as "createdAt",
        updated_at as "updatedAt",
        deleted_at as "deletedAt";
      `,
    [data.userId, data.totalPrice, data.status],
    );
    await this.db.query(
      `
        INSERT INTO shipping_details
          (carrier, address, city, country, state, postal_code, fee, delivery_date, order_id, created_at, updated_at)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
        RETURNING
          id,
          carrier,
          address,
          city,
          country,
          state,
          postal_code as "postalCode",
          fee,
          delivery_date as "deliveryDate",
          order_id as "orderId",
          created_at AS "createdAt",
          updated_at AS "updatedAt",
          deleted_at as "deletedAt";
      `,[data.carrier, data.address, data.city, data.country, data.state, data.postalCode, 20, (new Date()).toISOString(), order.id],
    );
    return plainToInstance(Order, order);
  }

  public async createOrderItem(data: OrderItemData) {
    const [orderItemData] = await this.db.query(`
      INSERT INTO ${ORDER_ITEM_TABLE}
        ( 
          order_id,
          product_id,
          price_per_unit,
          quantity,
          sub_total_price,
          created_at,
          updated_at
        )
      VALUES
        (
          $1,
          $2,
          $3,
          $4,
          $5,
          NOW(),
          NOW()
        )
      RETURNING 
        id,
        order_id as "orderId",
        product_id as "productId",
        quantity,
        price_per_unit as "pricePerUnit",
        created_at AS "createdAt",
        updated_at AS "updatedAt",
        deleted_at as "deletedAt"
    `, [data.order_id, data.product_id, data.price_per_unit, data.quantity, data.sub_total_price]);
    return plainToInstance(OrderItem, orderItemData);
  }

  public async getOrderHistory(userId: number) {
    return await this.db.query(
      `
        SELECT 
          p.name as "name",
          oi.quantity as "quantity",
          o.status as "status",
          oi.sub_total_price as "totalPrice"
        FROM orders o
        INNER JOIN order_items oi ON oi.order_id = o.id
        INNER JOIN products p ON p.id = oi.product_id
        WHERE o.user_id = ${userId}
      `,
    )
  }
}