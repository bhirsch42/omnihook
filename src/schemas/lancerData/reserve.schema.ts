import { z } from "zod";
import { actionSchema } from "./action.schema";
import { bonusSchema } from "./bonus.schema";
import { deployableSchema } from "./deployable.schema";
import { synergySchema } from "./synergy.schema";

export const reserveSchema = z
  .object({
    id: z.string(),
    bonuses: bonusSchema.array().optional(),
    description: z.string(),
    label: z.string(),
    type: z.string(),
    name: z.string(),
    deployables: deployableSchema.array().optional(),
    synergies: synergySchema.array().optional(),
    actions: actionSchema.array().optional(),
  })
  .strict();

export type Reserve = z.infer<typeof reserveSchema>;
