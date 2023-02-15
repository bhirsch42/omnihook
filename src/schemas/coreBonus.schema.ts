import camelize from "camelize-ts";
import { z } from "zod";

export const coreBonusSchema = z
  .object({
    description: z.string(),
    effect: z.string(),
    id: z.string(),
    name: z.string(),
    source: z.string(),
    mounted_effect: z.string().optional(),
  })
  .transform((o) => camelize(o, true));

export type CoreBonus = z.infer<typeof coreBonusSchema>;
