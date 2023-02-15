import { z } from "zod";

export const statusSchema = z
  .object({
    name: z.string(),
    icon: z.string(),
    type: z.string(),
    terse: z.string(),
    exclusive: z.enum(["Mech", "Pilot"]).optional(),
    effects: z.string(),
  })
  .strict();

export type Status = z.infer<typeof statusSchema>;
