import { z } from "zod";

export const createMechSchema = z.object({
  name: z.string(),
  pilotId: z.string().uuid(),
  frameId: z.string(),
});

export type CreateMech = z.infer<typeof createMechSchema>;
