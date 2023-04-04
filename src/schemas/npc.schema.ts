import { z } from "zod";

export const npcSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  classId: z.string(),
  templateId: z.string().optional(),
  tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  featureIds: z.string().array(),
  stats: z.object({
    statuses: z.string().array(),
    conditions: z.string().array(),
    resistances: z.string().array(),
    hp: z.number(),
    overshield: z.number(),
    heat: z.number(),
    moves: z.number(),
    burn: z.number(),
    activations: z.number(),
  }),
});

export type Npc = z.infer<typeof npcSchema>;
