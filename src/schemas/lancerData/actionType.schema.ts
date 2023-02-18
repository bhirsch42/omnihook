import { z } from "zod";

export const actionTypeSchema = z.enum([
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

export type ActionType = z.infer<typeof actionTypeSchema>;
