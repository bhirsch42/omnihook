import { capitalize } from "inflection";
import { z } from "zod";
import { DAMAGE_TYPES } from "./lancerData/damageType.schema";

export const RESISTANCE_TYPES = [
  ...DAMAGE_TYPES,
  "All",
  "Next Attack",
] as const;

export const resistanceTypeSchema = z.enum([
  ...RESISTANCE_TYPES,
  "Variable",
  "N/A",
]);

export type ResistanceType = z.infer<typeof resistanceTypeSchema>;
