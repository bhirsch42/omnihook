import { z } from "zod";
import { damageTypeSchema } from "./damageType.schema";
import { rollValueSchema } from "./rollValue.schema";

export const damageSchema = z
  .object({
    type: damageTypeSchema.default("N/A"),
    val: rollValueSchema,
    override: z.boolean().default(false),
  })
  .strict();

export type Damage = z.infer<typeof damageSchema>;
