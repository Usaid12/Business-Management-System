import { z } from 'zod';

const cartItemPayload = z.object({
  productId: z.number(),
});

export const addToCart = cartItemPayload;

export const removeFromCart = cartItemPayload;

export const updateItem = cartItemPayload.extend({
  quantity: z.number(),
});