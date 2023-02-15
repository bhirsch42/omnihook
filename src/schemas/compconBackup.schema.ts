import { z } from "zod";

const compconBackupFileSchema = z.union([
  z.object({
    filename: z.literal("user.config"),
    data: z.string(),
  }),
  z.object({
    filename: z.literal("active_missions_v2.json"),
    data: z.string().nullable(),
  }),
  z.object({
    filename: z.literal("missions_v2.json"),
    data: z.string().nullable(),
  }),
  z.object({
    filename: z.literal("encounters_v2.json"),
    data: z.string(),
  }),
  z.object({
    filename: z.literal("pilots_v2.json"),
    data: z.preprocess((o) => JSON.parse(o as string), z.any()),
  }),
  z.object({
    filename: z.literal("npcs_v2.json"),
    data: z.string().nullable(),
  }),
  z.object({
    filename: z.literal("extra_content.json"),
    data: z.string(),
  }),
  z.object({
    filename: z.literal("pilot_groups_v2.json"),
    data: z.string(),
  }),
]);

export const compconBackupSchema = compconBackupFileSchema.array();
