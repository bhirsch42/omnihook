import { z } from "zod";

export const activationTypeSchema = z.enum([
  "Free",
  "Quick",
  "Reaction",
  "Protocol",
  "Downtime",
  "Full",
  "Quick Tech",
  "Invade",
  "Move",
  "Missing",
  "Full Tech",
]);

export type ActivationType = z.infer<typeof activationTypeSchema>;
