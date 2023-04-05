import { z } from "zod";
import { npcClassSchema } from "./lancerData/npcClass.schema";

export const createNpcSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional(),
  class: npcClassSchema,
});

export type CreateNpc = z.infer<typeof createNpcSchema>;
