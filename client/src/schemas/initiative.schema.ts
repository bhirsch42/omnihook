import { z } from "zod";

export const initiativeSchema = z.union([
  z.object({
    type: z.literal("pc"),
    value: z.number(),
    id: z.string(),
  }),
  z.object({
    type: z.literal("npc"),
    value: z.number(),
    id: z.string(),
  }),
]);

export type Initiative = z.infer<typeof initiativeSchema>;
