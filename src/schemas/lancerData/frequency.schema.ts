import { z } from "zod";

export const frequencySchema = z.enum([
  "Free",
  "1/round",
  "2/round",
  "Unlimited",
  "Round",
  "Encounter",
]);

export type Frequency = z.infer<typeof frequencySchema>;
