import camelize from "camelize-ts";
import { z } from "zod";
import { npcStatsSchema } from "./npcStats.schema";

export const npcClassSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    base_features: z.string().array(),
    info: z.object({
      tactics: z.string(),
      flavor: z.string(),
    }),
    optional_features: z.string().array(),
    power: z.number(),
    role: z.string(),
    stats: npcStatsSchema,
  })
  .strict()
  .transform((o) => camelize(o, true));

export type NpcClass = z.infer<typeof npcClassSchema>;
