import { z } from "zod";

export const mechSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  pilotId: z.string().uuid(),
});

export type Mech = z.infer<typeof mechSchema>;
