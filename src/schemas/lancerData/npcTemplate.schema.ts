import camelize from "camelize-ts";
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
  .transform((o) => camelize(o, true));

export type NpcTemplate = z.infer<typeof npcTemplateSchema>;
