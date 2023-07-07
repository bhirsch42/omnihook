import { z } from "zod";
import { rollValueSchema } from "./rollValue.schema";
import { tagIdSchema } from "./tagId.schema";

export const tagRefSchema = z
  .object({
    id: tagIdSchema,
    val: rollValueSchema.optional(),
  })
  .strict();

export type TagRef = z.infer<typeof tagRefSchema>;
