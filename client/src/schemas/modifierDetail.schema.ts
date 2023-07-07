import { z } from "zod";

export const modifierDetailSchema = z.object({
  label: z.string(),
  value: z.number(),
});

export type ModifierDetail = z.infer<typeof modifierDetailSchema>;
