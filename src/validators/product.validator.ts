import { z } from 'zod';

export const createProduct = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
  category_id: z.string(),
});

export type CreateProductPayload = z.infer<typeof createProduct>