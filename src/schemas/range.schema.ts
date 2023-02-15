import { z } from "zod";
import { rangeTypeSchema } from "./rangeType.schema";

export const rangeSchema = z
  .object({
    type: rangeTypeSchema,
    val: z.union([z.number(), z.enum(["???", "N/A"])]),
    override: z.boolean().default(false),
  })
  .strict();

export type Range = z.infer<typeof rangeSchema>;
