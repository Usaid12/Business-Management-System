import { Roles } from '@src/constants/roles';
import { z } from 'zod';


export const createCategory = z.object({
  name: z.string(),
  parentId: z.number().optional(),
});

export type CreateCategoryPayload = z.infer<typeof createCategory>