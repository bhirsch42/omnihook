import { z } from "zod";

export const mechTypeSchema = z.enum([
  "Defender",
  "Controller",
  "Striker",
  "Artillery",
  "Support",
  "Balanced",
]);

export type MechType = z.infer<typeof mechTypeSchema>;
