import { z } from "zod";

export const orderValidator = z.object({
  address: z.string(),
});
