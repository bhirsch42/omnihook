import camelize from "camelize-ts";
import { z } from "zod";
import { actionSchema } from "./action.schema";
import { bonusSchema } from "./bonus.schema";
import { deployableSchema } from "./deployable.schema";
import { synergySchema } from "./synergy.schema";

export const coreSystemSchema = z
  .object({
    name: z.string(),
    use: z.string().optional(),
    activation: z.string(),
    active_effect: z.string(),
    active_name: z.string(),
    active_synergies: synergySchema.array().default([]),
    description: z.string().default("N/A"),
    passive_name: z.string().optional(),
    passive_effect: z.string().optional(),
    deactivation: z.string().optional(),
    integrated: z.string().array().optional(),
    active_actions: actionSchema.array().optional(),
    passive_actions: actionSchema.array().optional(),
    active_bonuses: bonusSchema.array().optional(),
    deployables: deployableSchema.array().optional(),
  })
  .strict()
  .transform((o) => camelize(o, true));

export type CoreSystem = z.infer<typeof coreSystemSchema>;
