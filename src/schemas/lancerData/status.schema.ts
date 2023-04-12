import { z } from "zod";
import { statusTypeSchema } from "./statusType.schema";
import { conditionTypeSchema } from "./conditionType.schema";

const DERIVED_STATUSES = ["DANGER ZONE"];

export const statusSchema = z
  .object({
    name: z.union([statusTypeSchema, conditionTypeSchema]),
    icon: z.string(),
    type: z.enum(["Status", "Condition"]),
    terse: z.string(),
    exclusive: z.enum(["Mech", "Pilot"]).optional(),
    effects: z.string(),
    isDerived: z.boolean().default(false),
  })
  .strict()
  .transform((o) => ({
    ...o,
    id: o.name,
    isDerived: DERIVED_STATUSES.includes(o.name),
  }));

export type Status = z.infer<typeof statusSchema>;
