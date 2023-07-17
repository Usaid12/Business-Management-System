import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import CartService from '@src/services/cart.service';
import { getLocals } from '@src/util/locals';
import { withTransaction } from '@src/util/withTransaction';
import { CreateOrderPayload } from '@src/validators/order.validator';

export const createOrder = withTransaction(async (manager, req, res) => {
  const data = req.body as CreateOrderPayload;
  const cartIds = data.cart_ids;
  const { userId } = getLocals(res.locals, 'payload');
  const cartService = new CartService(manager);
  const carts = await cartService.validateCartIds(cartIds, userId);

  

  return {
    data: {},
    message: 'Order has been placed successfully',
    statusCode: HttpStatusCodes.CREATED,
  };
});