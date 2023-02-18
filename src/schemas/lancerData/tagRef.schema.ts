import { z } from "zod";
import { rollValueSchema } from "./rollValue.schema";

export const tagRefSchema = z
  .object({
    id: z.string(),
    val: rollValueSchema.optional(),
  })
  .strict();

export type TagRef = z.infer<typeof tagRefSchema>;
