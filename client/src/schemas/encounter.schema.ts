import { z } from "zod";
import { npcDataSchema } from "./npcData.schema";
import { initiativeSchema } from "./initiative.schema";

export const encounterSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  pcs: z.never().array(),
  npcs: z.string().array(),
  initiatives: initiativeSchema.array(),
});

export type Encounter = z.infer<typeof encounterSchema>;
