import { z } from "zod";

export const createPilotSchema = z.object({
  name: z.string().min(1, "Required"),
  callsign: z.string().min(1, "Required"),
});

export type CreatePilot = z.infer<typeof createPilotSchema>;
