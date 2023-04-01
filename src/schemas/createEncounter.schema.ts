import { z } from "zod";

export const createEncounterSchema = z.object({
  name: z.string(),
});

export type CreateEncounter = z.infer<typeof createEncounterSchema>;
