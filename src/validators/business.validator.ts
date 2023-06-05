import { z } from 'zod';
import { register } from './auth.validator';

export const createBusiness = z.object({
  user: register,
  // business: z.object(),
});