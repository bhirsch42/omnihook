import { z } from "zod";
import { conditionTypeSchema } from "./lancerData/conditionType.schema";
import { resistanceTypeSchema } from "./resistanceType.schema";
import { statusTypeSchema } from "./lancerData/statusType.schema";

export const mechStatusSchema = z
  .object({
    id: z.string().uuid(),
    statuses: statusTypeSchema.array(),
    conditions: conditionTypeSchema.array(),
    resistances: resistanceTypeSchema.array(),
    damageReceived: z.number(),
    overshield: z.number(),
    heatReceived: z.number(),
    movementUsed: z.number(),
    burnReceived: z.number(),
    activationsUsed: z.number(),
    structure: z.number(),
    stressLost: z.number(),
  })
  .strict();

export type MechStatus = z.infer<typeof mechStatusSchema>;
