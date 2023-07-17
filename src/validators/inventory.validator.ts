import { z } from 'zod';

export const createInventory = z.object({
  product_id: z.number(),
  quantity: z.number(),
  price_per_unit: z.number(),
  arrivedAt: z.string(),
});

export type CreateInventoryPayload = z.infer<typeof createInventory>;