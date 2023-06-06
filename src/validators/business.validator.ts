import { z } from 'zod';
import { register } from './auth.validator';

export const createBusiness = z.object({
  user: register.omit({ password: true, role: true }),
  business: z.object({
    name: z.string(),
    email: z.string(),
    contactNo: z.string(),
    city: z.string(),
    country: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string().default('').optional(),
    postalCode: z.string(),
  }),
});
export type CreateBusinessPayload = z.infer<typeof createBusiness>;