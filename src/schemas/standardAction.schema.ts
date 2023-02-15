import { z } from "zod";
import { synergyLocationSchema } from "./synergyLocation.schema";
import camelize from "camelize-ts";
import { actionSchema, actionSchemaRaw } from "./action.schema";

export const standardActionSchema = actionSchemaRaw
  .merge(
    z.object({
      hide_active: z.boolean().default(false),
      id: z.string(),
      mech: z.boolean().default(false),
      pilot: z.boolean().default(false),
      ignore_used: z.boolean().default(false),
      terse: z.string(),
      confirm: z.string().array().default([]),
      synergy_locations: synergyLocationSchema.array().default([]),
    })
  )
  .strict()
  .transform((o) => camelize(o, true));

export type StandardAction = z.infer<typeof standardActionSchema>;
