import { z } from "zod";

export const createMechSchema = z.object({
  name: z.string(),
  pilotId: z.string().uuid(),
});

export type CreateMech = z.infer<typeof createMechSchema>;
