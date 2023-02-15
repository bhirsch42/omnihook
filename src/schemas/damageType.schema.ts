import { capitalize } from "inflection";
import { z } from "zod";

function preProcessDamageTypeSchema(o: unknown) {
  const result = z.string().transform(capitalize).safeParse(o);

  if (result.success) {
    if (result.data === "N/a") return "N/A";
    return result.data;
  }

  console.warn(`Couldn't parse damage type:`, o);

  return o;
}

export const damageTypeSchema = z.preprocess(
  preProcessDamageTypeSchema,
  z.enum(["Kinetic", "Energy", "Explosive", "Heat", "Burn", "Variable", "N/A"])
);

export type DamageType = z.infer<typeof damageTypeSchema>;
