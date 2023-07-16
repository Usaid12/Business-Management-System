import { z } from 'zod';

export const createReviews = z.object({
  product_id: z.number(),
  comments: z.string(),
});

export const deleteReviews = z.object({
  product_id: z.number(),
});

export type CreateReviewPayload = z.infer<typeof createReviews>;
export type DeleteReviewPayload = z.infer<typeof deleteReviews>;
