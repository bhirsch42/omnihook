import camelize from "camelize-ts";
import { z } from "zod";
import { actionSchema } from "./action.schema";
import { damageSchema } from "./damage.schema";
import { deployableSchema } from "./deployable.schema";
import { rangeSchema } from "./range.schema";
import { tagRefSchema } from "./tagRef.schema";
import { weaponProfileSchema } from "./weaponProfile.schema";
import { weaponSizeSchema } from "./weaponSize.schema";
import { weaponTypeSchema } from "./weaponType.schema";

export const weaponSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    mount: weaponSizeSchema,
    type: weaponTypeSchema,
    damage: damageSchema.array().optional(),
    range: rangeSchema.array().optional(),
    tags: tagRefSchema.array().optional(),
    source: z.string().optional(),
    license: z.string().optional(),
    license_level: z.number().optional(),
    on_crit: z.string().optional(),
    description: z.string().optional(),
    effect: z.string().optional(),
    license_id: z.string(),
    profiles: weaponProfileSchema.array().optional(),
    on_hit: z.string().optional(),
    on_attack: z.string().optional(),
    sp: z.number().optional(),
    no_attack: z.boolean().default(false),
    actions: actionSchema.array().optional(),
    deployables: deployableSchema.array().optional(),
    no_mods: z.boolean().default(false),
    no_core_bonus: z.boolean().default(false),
    no_synergies: z.boolean().default(false),
    talent_item: z.boolean().default(false),
    talent_id: z.string().optional(),
    talent_rank: z.number().optional(),
    skirmish: z.boolean().default(true),
    barrage: z.boolean().default(true),
  })
  .strict()
  .transform((o) => camelize(o, true));

export type Weapon = z.infer<typeof weaponSchema>;
