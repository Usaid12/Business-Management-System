import { z } from 'zod';

export const createOrder = z.object({
  cart_ids: z.array(z.number()),
  carrier: z.string(),
  address: z.number(),
  city: z.string(),
  country: z.string(),
  state: z.string(),
  postalCode: z.string(),
});

export type CreateOrderPayload = z.infer<typeof createOrder>;