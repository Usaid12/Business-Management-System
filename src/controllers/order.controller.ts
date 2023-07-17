import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import CartService from '@src/services/cart.service';
import OrderService from '@src/services/order.service';
import { getLocals } from '@src/util/locals';
import { withTransaction } from '@src/util/withTransaction';
import { CreateOrderPayload } from '@src/validators/order.validator';

export const createOrder = withTransaction(async (manager, req, res) => {
  const { cart_ids, ...data } = req.body as CreateOrderPayload;
  const { userId } = getLocals(res.locals, 'payload');
  const cartService = new CartService(manager);
  const orderService = new OrderService(manager);
  const carts = await cartService.validateCartIds(cart_ids, userId);
  const totalPrice = carts.reduce((current, item) => current + (item.price * item.quantity), 0);
  const order = await orderService.createOrder({ ...data, userId, totalPrice, status: 'pending' });
  const orderItems = await Promise.all(carts.map(async cart => {
    return await orderService.createOrderItem({
      order_id: order.id,
      product_id: cart.productId,
      quantity: cart.quantity,
      price_per_unit: cart.price,
      sub_total_price: cart.price * cart.quantity,
    });
  }));

  await Promise.all(carts.map(cart => cartService.deleteItem({ id: cart.id })));
  return {
    data: {
      ...order,
      orderItems,
    },
    message: 'Order has been placed successfully',
    statusCode: HttpStatusCodes.CREATED,
  };
});

export const getOrderHisotry = withTransaction(async (manager, req, res) => {
  const userId = getLocals(res.locals, 'payload').userId;
  const orderService = new OrderService(manager);
  const order = await orderService.getOrderHistory(userId);
  return {
    data: order,
    message: 'Order history',
    statusCode: HttpStatusCodes.OK,
  };
});