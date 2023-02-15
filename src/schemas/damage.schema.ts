import { z } from "zod";
import { damageTypeSchema } from "./damageType.schema";
import { DICE_ROLL } from "./diceRoll.regex";
import { capitalize } from "inflection";

export const damageSchema = z
  .object({
    type: damageTypeSchema,
    val: z.union([z.number(), z.string().regex(DICE_ROLL)]),
  })
  .strict();

export type Damage = z.infer<typeof damageSchema>;
