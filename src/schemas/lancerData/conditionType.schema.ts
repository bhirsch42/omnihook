import { z } from "zod";

export const conditionTypeSchema = z.enum([
  "IMMOBILIZED",
  "IMPAIRED",
  "JAMMED",
  "LOCK ON",
  "SHREDDED",
  "SLOWED",
  "STUNNED",
]);

export type ConditionType = z.infer<typeof conditionTypeSchema>;
