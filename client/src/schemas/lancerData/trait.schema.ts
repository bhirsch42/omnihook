import { z } from "zod";
import { frequencySchema } from "./frequency.schema";

export const traitSchema = z.object({
  name: z.string(),
  description: z.string(),
  use: frequencySchema.optional(),
});

export type Trait = z.infer<typeof traitSchema>;
