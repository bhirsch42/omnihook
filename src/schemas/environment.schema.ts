import { z } from "zod";

export const environmentSchema = z
  .object({
    description: z.string(),
    id: z.string(),
    name: z.string(),
  })
  .strict();

export type Environment = z.infer<typeof environmentSchema>;
