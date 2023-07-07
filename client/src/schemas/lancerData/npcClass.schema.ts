import { z } from "zod";
import { npcStatsSchema } from "./npcStats.schema";
import { omit } from "ramda";

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
  .transform((o) => {
    return {
      ...omit(["base_features", "optional_features"], o),
      baseFeatures: o.base_features,
      optionalFeatures: o.optional_features,
    };
  });

export type NpcClass = z.infer<typeof npcClassSchema>;
