import { omit } from "ramda";
import { z } from "zod";

export const npcTemplateSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    base_features: z.string().array(),
    optional_features: z.string().array(),
    power: z.number(),
  })
  .strict()
  .transform((o) => {
    return {
      ...omit(["base_features", "optional_features"], o),
      baseFeatures: o.base_features,
      optionalFeatures: o.optional_features,
    };
  });

export type NpcTemplate = z.infer<typeof npcTemplateSchema>;
