import camelize from "camelize-ts";
import { z } from "zod";
import { tagRefSchema } from "./tagRef.schema";
import { actionSchema } from "./action.schema";
import { damageSchema } from "./damage.schema";
import { rangeSchema } from "./range.schema";
import { bonusSchema } from "./bonus.schema";
import { deployableSchema } from "./deployable.schema";
import { pilotGearTypeSchema } from "./pilotGearType.schema";

export const pilotGearSchema = z
  .object({
    damage: damageSchema.array().optional(),
    description: z.string(),
    id: z.string(),
    name: z.string(),
    range: rangeSchema.array().optional(),
    tags: tagRefSchema.array().default([]),
    type: pilotGearTypeSchema,
    effect: z.string().optional(),
    bonuses: bonusSchema.array().optional(),
    actions: actionSchema.array().optional(),
    deployables: deployableSchema.array().optional(),
  })
  .strict()
  .transform((o) => camelize(o, true));

export type PilotGear = z.infer<typeof pilotGearSchema>;
