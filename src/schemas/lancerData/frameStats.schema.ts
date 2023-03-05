import camelize from "camelize-ts";
import { z } from "zod";
import { ExpandRecursively } from "../../utils/types";
import { coreSystemSchema } from "./coreSystem.schema";

export const frameStatsSchema = z
  .object({
    armor: z.number(),
    size: z.number(),
    structure: z.number(),
    stress: z.number(),
    hp: z.number(),
    evasion: z.number(),
    edef: z.number(),
    heatcap: z.number(),
    repcap: z.number(),
    sensor_range: z.number(),
    tech_attack: z.number(),
    save: z.number(),
    speed: z.number(),
    sp: z.number(),
  })
  .strict()
  .transform((o) => camelize(o, true));

export type FrameStats = ExpandRecursively<z.infer<typeof frameStatsSchema>>;
