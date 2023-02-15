import { z } from "zod";

export const weaponSizeSchema = z.enum([
  "Auxiliary",
  "Main",
  "Heavy",
  "Superheavy",
]);

export type WeaponSize = z.infer<typeof weaponSizeSchema>;
