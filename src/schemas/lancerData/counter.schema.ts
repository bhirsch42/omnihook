import camelize from "camelize-ts";
import { z } from "zod";

export const counterSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    default_value: z.number(),
    min: z.number(),
    max: z.number(),
    level: z.number().optional(),
  })
  .strict()
  .transform((o) => camelize(o, true));

export type Counter = z.infer<typeof counterSchema>;
