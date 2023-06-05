import { z } from 'zod';

export const createProduct = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number()
});

export type CreateProductPayload = z.infer<typeof createProduct>