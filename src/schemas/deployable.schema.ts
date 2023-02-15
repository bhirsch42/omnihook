import { z } from "zod";
import { actionSchema } from "./action.schema";
import { activationTypeSchema } from "./activationType.schema";
import { deployableTypeSchema } from "./deployableType.schema";

// Deployables from pilot gear (ex. "Thermite Charge") are formatted
// differently, and need to be handled as a special case.
const handlePilotGearDeployable = (o: any) => {
  if (!o.pilot) return o;
  return {
    ...o,
    hp: "1",
    redeploy: "Full",
    activation: "Full",
    recall: "Full",
    size: 0,
  };
};

const _deployableSchema = z
  .object({
    activation: activationTypeSchema,
    detail: z.string(),
    hp: z.string().regex(/[0-9]+( \+ \{grit\})?/),
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
  handlePilotGearDeployable,
  _deployableSchema
);

export type Deployable = z.infer<typeof deployableSchema>;
