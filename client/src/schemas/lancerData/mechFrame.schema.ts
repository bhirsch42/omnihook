import camelize from "camelize-ts";
import { z } from "zod";
import { artSchema } from "./art.schema";
import { coreSystemSchema } from "./coreSystem.schema";
import { counterSchema } from "./counter.schema";
import { frameStatsSchema } from "./frameStats.schema";
import { mechTypeSchema } from "./mechType.schema";
import { mountTypeSchema } from "./mountType.schema";
import { traitSchema } from "./trait.schema";

export const mechFrameSchema = z
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
    mounts: mountTypeSchema.array(),
    traits: traitSchema.array(),
    data_type: z.enum(["frame"]).optional(),
    counters: counterSchema.array().optional(),
  })
  .strict()
  .transform((o) => ({
    ...camelize(o, true),
    mechType: o.mechtype,
    mounts: o.mounts,
  }));

export type MechFrame = z.infer<typeof mechFrameSchema>;
