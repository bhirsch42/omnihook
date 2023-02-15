import { z } from "zod";
import { actionSchema } from "./action.schema";
import { synergySchema } from "./synergy.schema";
import { talentRankSchema } from "./talentRank.schema";

export const talentSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    icon: z.string(),
    terse: z.string(),
    description: z.string(),
    ranks: talentRankSchema.array(),
    actions: actionSchema.array().optional(),
    synergies: synergySchema.array().optional(),
  })
  .strict();
