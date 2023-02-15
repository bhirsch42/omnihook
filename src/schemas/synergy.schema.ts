import camelize from "camelize-ts";
import { flatten } from "ramda";
import { z } from "zod";
import { synergyLocationSchema } from "./synergyLocation.schema";
import { systemTypeSchema } from "./systemType.schema";
import { weaponSizeSchema } from "./weaponSize.schema";
import { weaponTypeSchema } from "./weaponType.schema";

const preProcessSynergyLocationSchemaArray = function preProcess(o: any) {
  const arr = z.string().array().parse(o);
  return flatten(arr.map((str) => str.split(",").map((s) => s.trim())));
};

export const synergySchema = z
  .object({
    detail: z.string(),
    locations: z.preprocess(
      preProcessSynergyLocationSchemaArray,
      synergyLocationSchema.array()
    ),
    weapon_types: weaponTypeSchema.array().optional(),
    weapon_sizes: weaponSizeSchema.array().optional(),
    system_types: systemTypeSchema.array().optional(),
  })
  .strict()
  .transform((o) => camelize(o, true));

export type Synergy = z.infer<typeof synergySchema>;
