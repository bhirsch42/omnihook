import { z } from "zod";
import { weaponTypeSchema } from "./weaponType.schema";

export const tagSchema = z
  .object({
    id: z.string(),
    val: z.number().optional(),
  })
  .strict();

export type Tag = z.infer<typeof tagSchema>;
