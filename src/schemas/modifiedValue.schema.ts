import { z } from "zod";
import { modifierDetailSchema } from "./modifierDetail.schema";

export const modifiedValueSchema = z.object({
  value: z.number(),
  modifiers: modifierDetailSchema.array(),
});

export type ModifiedValue = z.infer<typeof modifiedValueSchema>;
