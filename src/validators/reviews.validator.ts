import { z } from 'zod';

export const createReviews = z.object({
    id: z.number(),
    user_id: z.number(),
    product_id: z.number(),
    comments: z.string(),
});
export type CreateReviewPayload = z.infer<typeof createReviews>;