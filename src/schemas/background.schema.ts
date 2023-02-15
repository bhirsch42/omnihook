import { z } from "zod";

export const backgroundSchema = z
  .object({
    description: z.string(),
    id: z.string(),
    name: z.string(),
  })
  .strict();

export type Background = z.infer<typeof backgroundSchema>;
