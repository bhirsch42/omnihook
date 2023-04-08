import { z } from "zod";

export const mechStatusSchema = z
  .object({
    id: z.string().uuid(),
    statuses: z.string().array(),
    conditions: z.string().array(),
    resistances: z.string().array(),
    damageReceived: z.number(),
    overshield: z.number(),
    heatReceived: z.number(),
    movementUsed: z.number(),
    burnReceived: z.number(),
    activationsUsed: z.number(),
  })
  .strict();

export type MechStatus = z.infer<typeof mechStatusSchema>;
