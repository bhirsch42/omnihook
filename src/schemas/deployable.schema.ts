import { z } from "zod";
import { actionSchema } from "./action.schema";
import { activationTypeSchema } from "./activationType.schema";
import { deployableTypeSchema } from "./deployableType.schema";

// Deployables from pilot gear (ex. "Thermite Charge") are formatted
// differently, and need to be handled as a special case.
const handleAlternateDeployables = (o: any) => {
  if (o.name === "Deployable Shield (Reserve)") {
    return {
      ...o,
      redeploy: "Full",
      activation: "Full",
      recall: "Full",
    };
  }

  if (o.pilot) {
    return {
      ...o,
      redeploy: "Full",
      activation: "Full",
      recall: "Full",
      size: 0,
    };
  }

  return o;
};

const _deployableSchema = z
  .object({
    activation: activationTypeSchema,
    detail: z.string(),
    hp: z
      .string()
      .regex(/[0-9]+( \+ \{grit\})?/)
      .optional(),
    name: z.string(),
    type: deployableTypeSchema,
    recall: activationTypeSchema,
    redeploy: activationTypeSchema,
    size: z.number(),
    pilot: z.boolean().default(false),
    actions: actionSchema.array().optional(),
  })
  .strict();

export const deployableSchema = z.preprocess(
  handleAlternateDeployables,
  _deployableSchema
);

export type Deployable = z.infer<typeof deployableSchema>;
