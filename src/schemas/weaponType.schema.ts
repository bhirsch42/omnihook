import { z } from "zod";

export const weaponTypeSchema = z.enum([
  "Rifle",
  "Cannon",
  "Launcher",
  "CQB",
  "Nexus",
  "Melee",
  "???",
]);

export type WeaponType = z.infer<typeof weaponTypeSchema>;
