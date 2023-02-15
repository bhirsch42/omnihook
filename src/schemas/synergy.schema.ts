import { z } from "zod";
import { synergyLocationSchema } from "./synergyLocation.schema";

export const synergySchema = z
  .object({
    detail: z.string(),
    locations: synergyLocationSchema.array(),
  })
  .strict();

export type Synergy = z.infer<typeof synergySchema>;
