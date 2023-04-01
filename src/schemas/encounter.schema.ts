import { z } from "zod";
import { npcSchema } from "./npc.schema";
import { initiativeSchema } from "./initiative.schema";

export const encounterSchema = z.object({
  name: z.string(),
  pcs: z.never().array(),
  npcs: npcSchema.array(),
  initiatives: initiativeSchema.array(),
});

export type Encounter = z.infer<typeof encounterSchema>;
