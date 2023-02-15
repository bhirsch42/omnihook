import camelize from "camelize-ts";
import { z } from "zod";
import { damageTypeSchema } from "./damageType.schema";
import { rangeTypeSchema } from "./rangeType.schema";
import { weaponTypeSchema } from "./weaponType.schema";

export const bonusSchema = z
  .object({
    damage_types: damageTypeSchema.array().optional(),
    id: z.string(),
    val: z.number(),
    replace: z.boolean().default(false),
    range_types: rangeTypeSchema.array().optional(),
    weapon_types: weaponTypeSchema.array().optional(),
  })
  .strict()
  .transform((o) => camelize(o, true));

export type Bonus = z.infer<typeof bonusSchema>;
