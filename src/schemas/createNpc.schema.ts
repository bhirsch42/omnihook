import { z } from "zod";

export const createNpcSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional(),
});

export type CreateNpc = z.infer<typeof createNpcSchema>;
