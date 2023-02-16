import camelize from "camelize-ts";
import { z } from "zod";
import { damageTypeSchema } from "./damageType.schema";
import { rangeTypeSchema } from "./rangeType.schema";
import { rollValueSchema } from "./rollValue.schema";
import { weaponTypeSchema } from "./weaponType.schema";

export const bonusSchema = z
  .object({
    damage_types: damageTypeSchema.array().optional(),
    id: z.string(),
    val: z.union([z.number(), z.boolean(), rollValueSchema.array()]),
    replace: z.boolean().default(false),
    range_types: rangeTypeSchema.array().optional(),
    weapon_types: weaponTypeSchema.array().optional(),
  })
  .strict()
  .transform((o) => camelize(o, true));

export type Bonus = z.infer<typeof bonusSchema>;
