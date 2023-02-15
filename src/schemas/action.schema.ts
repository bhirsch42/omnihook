import camelize from "camelize-ts";
import { z } from "zod";
import { actionTypeSchema } from "./actionType.schema";
import { damageSchema } from "./damage.schema";
import { rangeSchema } from "./range.schema";

export const actionSchemaRaw = z
  .object({
    activation: actionTypeSchema.default("Missing"),
    detail: z.string(),
    name: z.string().optional(),
    frequency: z.string().optional(),
    trigger: z.string().optional(),
    init: z.string().optional(),
    pilot: z.boolean().default(false),
    damage: damageSchema.array().optional(),
    range: rangeSchema.array().optional(),
    tech_attack: z.boolean().default(false),
    heat_cost: z.number().optional(),
  })
  .strict();

export const actionSchema = actionSchemaRaw.transform((o) => camelize(o, true));

export type Action = z.infer<typeof actionSchema>;
