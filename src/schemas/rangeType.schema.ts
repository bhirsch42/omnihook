import { z } from "zod";

export const rangeTypeSchema = z.enum([
  "Range",
  "Threat",
  "Thrown",
  "Line",
  "Cone",
  "Blast",
  "Burst",
]);

export type RangeType = z.infer<typeof rangeTypeSchema>;
