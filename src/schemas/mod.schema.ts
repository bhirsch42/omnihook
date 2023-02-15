import camelize from "camelize-ts";
import { z } from "zod";
import { tagSchema } from "./tag.schema";
import { weaponTypeSchema } from "./weaponType.schema";
import { weaponSizeSchema } from "./weaponSize.schema";
import { actionSchema } from "./action.schema";
import { damageSchema } from "./damage.schema";
import { rangeSchema } from "./range.schema";

export const modSchema = z
  .object({
    added_damage: damageSchema.array().optional(),
    allowed_types: weaponTypeSchema.array(),
    description: z.string(),
    effect: z.string(),
    id: z.string(),
    license: z.string(),
    license_id: z.string(),
    license_level: z.number(),
    name: z.string(),
    source: z.string(),
    sp: z.number(),
    tags: tagSchema.array().default([]),
    restricted_sizes: weaponSizeSchema.array().optional(),
    actions: actionSchema.array().optional(),
    added_range: rangeSchema.array().optional(),
    added_tags: tagSchema.array().optional(),
  })
  .strict()
  .transform((o) => camelize(o, true));

export type Mod = z.infer<typeof modSchema>;
