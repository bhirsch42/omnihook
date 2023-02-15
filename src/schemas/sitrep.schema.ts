import { z } from "zod";

export const sitrepSchema = z
  .object({
    id: z.string(),
    description: z.string(),
    name: z.string(),
    enemyVictory: z.string(),
    noVictory: z.string().optional(),
    pcVictory: z.string(),
    deployment: z.string().optional(),
    objective: z.string().optional(),
    extraction: z.string().optional(),
    controlZone: z.string().optional(),
  })
  .strict();

export type Sitrep = z.infer<typeof sitrepSchema>;
