import camelize from "camelize-ts";
import { z } from "zod";

export const tagSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    filter_ignore: z.boolean().default(false),
    hidden: z.boolean().default(false),
  })
  .strict()
  .transform((o) => camelize(o, true));

export type Tag = z.infer<typeof tagSchema>;
