import { z } from "zod";

export const npcFeatureTypeSchema = z.enum([
  "System",
  "Weapon",
  "Reaction",
  "Trait",
  "Tech",
]);

export type NpcFeatureType = z.infer<typeof npcFeatureTypeSchema>;
