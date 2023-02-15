import camelize from "camelize-ts";
import { z } from "zod";
import { DICE_ROLL } from "./diceRoll.regex";
import { fittingSizeSchema } from "./fittingSize.schema";
import { skillFamilySchema } from "./skillFamily.schema";
import { weaponSizeSchema } from "./weaponSize.schema";

export const rulesSchema = z
  .object({
    base_structure: z.number(),
    base_stress: z.number(),
    base_grapple: z.number(),
    base_ram: z.number(),
    base_pilot_hp: z.number(),
    base_pilot_evasion: z.number(),
    base_pilot_edef: z.number(),
    base_pilot_speed: z.number(),
    minimum_pilot_skills: z.number(),
    minimum_mech_skills: z.number(),
    minimum_pilot_talents: z.number(),
    trigger_bonus_per_rank: z.number(),
    max_trigger_rank: z.number(),
    max_pilot_level: z.number(),
    max_pilot_weapons: z.number(),
    max_pilot_armor: z.number(),
    max_pilot_gear: z.number(),
    max_frame_size: z.number(),
    max_mech_armor: z.number(),
    max_hase: z.number(),
    mount_fittings: z.record(fittingSizeSchema, weaponSizeSchema.array()),
    overcharge: z.string().regex(DICE_ROLL).array().length(4),
    skill_headers: z
      .object({ attr: skillFamilySchema, description: z.string() })
      .array(),
  })
  .strict()
  .transform((o) => camelize(o, true));

export type Rules = z.infer<typeof rulesSchema>;
