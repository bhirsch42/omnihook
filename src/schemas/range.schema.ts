import { z } from "zod";
import { rangeTypeSchema } from "./rangeType.schema";

export const rangeSchema = z
  .object({
    type: rangeTypeSchema,
    val: z.number(),
  })
  .strict();

export type Range = z.infer<typeof rangeSchema>;
