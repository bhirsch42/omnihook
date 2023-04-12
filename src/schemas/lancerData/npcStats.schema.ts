import { z } from "zod";
import { tieredStatSchema } from "./tieredStat.schema";

export const npcStatsSchema = z
  .object({
    activations: tieredStatSchema,
    agility: tieredStatSchema,
    armor: tieredStatSchema,
    edef: tieredStatSchema,
    engineering: tieredStatSchema,
    evade: tieredStatSchema,
    heatcap: tieredStatSchema.nullable(),
    hp: tieredStatSchema,
    hull: tieredStatSchema,
    save: tieredStatSchema,
    sensor: tieredStatSchema,
    size: z.number().array().array().length(3),
    speed: tieredStatSchema,
    systems: tieredStatSchema,
  })
  .strict();

export type NpcStats = z.infer<typeof npcStatsSchema>;
