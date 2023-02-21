import { z } from "zod";

export const pilotGearRefSchema = z.object({
  id: z.string(), // uuid
  pilotGearId: z.string(),
  uses: z.number().optional().nullable(),
});

export type PilotGearRef = z.infer<typeof pilotGearRefSchema>;
