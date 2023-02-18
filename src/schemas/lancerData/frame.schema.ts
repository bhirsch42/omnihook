import camelize from "camelize-ts";
import { z } from "zod";
import { coreSystemSchema } from "./coreSystem.schema";

export const frameSchema = z
  .object({
    id: z.string(),
    description: z.string(),
    image_url: z.string(),
    license_id: z.string(),
    license_level: z.number(),
    name: z.string(),
    source: z.string(),
    y_pos: z.number(),
    core_system: coreSystemSchema,
  })
  .transform((o) => camelize(o, true));

export type Frame = z.infer<typeof frameSchema>;
