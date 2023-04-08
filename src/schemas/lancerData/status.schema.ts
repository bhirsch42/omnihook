import { z } from "zod";

export const statusSchema = z
  .object({
    name: z.string(),
    icon: z.string(),
    type: z.enum(["Status", "Condition"]),
    terse: z.string(),
    exclusive: z.enum(["Mech", "Pilot"]).optional(),
    effects: z.string(),
  })
  .strict()
  .transform((o) => ({
    ...o,
    id: o.name,
  }));

export type Status = z.infer<typeof statusSchema>;
