import { z } from "zod";
import { activationTypeSchema } from "./activationType.schema";
import { damageSchema } from "./damage.schema";
import { rangeSchema } from "./range.schema";

export const actionSchema = z
  .object({
    activation: activationTypeSchema,
    detail: z.string(),
    name: z.string(),
    frequency: z.string().optional(),
    trigger: z.string().optional(),
    init: z.string().optional(),
    pilot: z.boolean().default(false),
    damage: damageSchema.array().optional(),
    range: rangeSchema.array().optional(),
  })
  .strict();

export type Action = z.infer<typeof actionSchema>;
