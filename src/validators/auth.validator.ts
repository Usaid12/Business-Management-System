import { Roles } from '@src/constants/roles';
import { z } from 'zod';
const validRoles = Object.values(Roles) as z.EnumValues;

export const register = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.enum(['male', 'female']),
  role: z.enum(validRoles),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be strong'),
  phoneNumber: z.string(),
});

export const login = z.object({
  email: z.string(),
  password: z.string(),
});

export type RegisterPayload = z.infer<typeof register>
export type LoginPayload = z.infer<typeof login>
