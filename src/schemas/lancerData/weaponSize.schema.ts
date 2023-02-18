import { z } from "zod";

export const weaponSizeSchema = z.enum([
  "Auxiliary",
  "Main",
  "Heavy",
  "Superheavy",
  "any",
  "Ship-class",
]);

export type WeaponSize = z.infer<typeof weaponSizeSchema>;
