import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { withTransaction } from '@src/util/withTransaction';

export const createOrder = withTransaction(async (manager, req, res) => {

  await Promise.resolve();

  return {
    data: {},
    message: 'Order has been placed successfully',
    statusCode: HttpStatusCodes.CREATED,
  };
});