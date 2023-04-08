import { z } from "zod";

export const npcSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  classId: z.string(),
  templateId: z.string().optional(),
  tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  featureIds: z.string().array(),
  combatStatus: z.object({
    statuses: z.string().array(),
    conditions: z.string().array(),
    resistances: z.string().array(),
    damageReceived: z.number(),
    overshield: z.number(),
    heatReceived: z.number(),
    movementUsed: z.number(),
    burnReceived: z.number(),
    activationsUsed: z.number(),
  }),
});

export type Npc = z.infer<typeof npcSchema>;
