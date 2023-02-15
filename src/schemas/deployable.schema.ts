import { z } from "zod";
import { actionSchema } from "./action.schema";
import { activationTypeSchema } from "./activationType.schema";
import { counterSchema } from "./counter.schema";
import { deployableTypeSchema } from "./deployableType.schema";
import { rangeSchema } from "./range.schema";
import { tagRefSchema } from "./tagRef.schema";

export const deployableSchema = z
  .object({
    activation: activationTypeSchema.optional(),
    detail: z.string(),
    hp: z.coerce
      .string()
      .regex(/[0-9]+( \+ \{grit\})?/)
      .optional(),
    name: z.string(),
    type: deployableTypeSchema,
    recall: activationTypeSchema.optional(),
    redeploy: activationTypeSchema.optional(),
    size: z.number().optional(),
    pilot: z.boolean().default(false),
    actions: actionSchema.array().optional(),
    range: rangeSchema.array().optional(),
    instances: z.number().optional(),
    evasion: z.number().optional(),
    edef: z.number().optional(),
    cost: z.number().optional(),
    counters: counterSchema.array().optional(),
    tags: tagRefSchema.array().optional(),
    deactivation: activationTypeSchema.optional(),
    armor: z.number().optional(),
  })
  .strict();

export type Deployable = z.infer<typeof deployableSchema>;
