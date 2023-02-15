import { capitalize } from "inflection";
import { z } from "zod";

export const damageTypeSchema = z.preprocess(
  z.string().transform(capitalize).parse,
  z.enum(["Kinetic", "Energy", "Explosive", "Heat", "Burn", "Variable"])
);

export type DamageType = z.infer<typeof damageTypeSchema>;
