import { z } from "zod";

export const pilotSchema = z.object({
  id: z.string(),
  name: z.string(),
  callsign: z.string(),
  background: z.string().optional(),
  biography: z.string().optional(),
  description: z.string().optional(),
});

export type Pilot = z.infer<typeof pilotSchema>;
