import { z } from "zod";

export const userDataValidator = z.object({
  firstname: z.string(),
  lastname: z.string(),
});
