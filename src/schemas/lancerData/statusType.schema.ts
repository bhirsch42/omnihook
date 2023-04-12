import { z } from "zod";

export const statusTypeSchema = z.enum([
  "DANGER ZONE",
  "DOWN AND OUT",
  "ENGAGED",
  "EXPOSED",
  "HIDDEN",
  "INVISIBLE",
  "PRONE",
  "SHUT DOWN",
]);

export type StatusType = z.infer<typeof statusTypeSchema>;
