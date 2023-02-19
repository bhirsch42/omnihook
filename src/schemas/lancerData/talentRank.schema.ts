import camelize from "camelize-ts";
import { z } from "zod";
import { actionSchema } from "./action.schema";
import { bonusSchema } from "./bonus.schema";
import { counterSchema } from "./counter.schema";
import { synergySchema } from "./synergy.schema";

export const talentRankSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    synergies: synergySchema.array().optional(),
    actions: actionSchema.array().optional(),
    counters: counterSchema.array().optional(),
    bonuses: bonusSchema.array().optional(),
    integrated: z.string().array().optional(),
    exclusive: z.boolean().default(false),
    special_equipment: z.string().array().optional(),
  })
  .strict()
  .transform((o) => camelize(o, true));

export type TalentRank = z.infer<typeof talentRankSchema>;
