import camelize from "camelize-ts";
import { z } from "zod";
import { ExpandRecursively } from "../../utils/types";
import { artSchema } from "./art.schema";
import { coreSystemSchema } from "./coreSystem.schema";
import { counterSchema } from "./counter.schema";
import { frameStatsSchema } from "./frameStats.schema";
import { mechTypeSchema } from "./mechType.schema";
import { mountSchema } from "./mount.schema";
import { traitSchema } from "./trait.schema";

export const frameSchema = z
  .object({
    id: z.string(),
    description: z.string(),
    image_url: z.string(),
    license_id: z.string(),
    license_level: z.number(),
    name: z.string(),
    source: z.string(),
    y_pos: z.number(),
    core_system: coreSystemSchema,
    stats: frameStatsSchema,
    other_art: artSchema.array().optional(),
    mechtype: mechTypeSchema.array(),
    mounts: mountSchema.array(),
    traits: traitSchema.array(),
    data_type: z.enum(["frame"]).optional(),
    counters: counterSchema.array().optional(),
  })
  .strict()
  .transform((o) => ({ ...camelize(o, true), mechType: o.mechtype }));

export type Frame = ExpandRecursively<z.infer<typeof frameSchema>>;
