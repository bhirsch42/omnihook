import camelize from "camelize-ts";
import { z } from "zod";
import { actionSchema } from "./action.schema";
import { bonusSchema } from "./bonus.schema";
import { synergySchema } from "./synergy.schema";

export const coreBonusSchema = z
  .object({
    description: z.string(),
    effect: z.string(),
    id: z.string(),
    name: z.string(),
    source: z.string(),
    mounted_effect: z.string().optional(),
    bonuses: bonusSchema.array().optional(),
    synergies: synergySchema.array().optional(),
    actions: actionSchema.array().optional(),
  })
  .strict()
  .transform((o) => camelize(o, true));

export type CoreBonus = z.infer<typeof coreBonusSchema>;
