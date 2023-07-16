import { z } from "zod";

export const createOrder = z.object({

});

export type CreateOrderPayload = z.infer<typeof createOrder>;