import { z } from "zod";

export const createMechFormSchema = z.object({
  name: z.string().min(1),
  pilotId: z.string().uuid(),
  frameId: z.string(),
});

export type CreateMech = z.infer<typeof createMechFormSchema>;
