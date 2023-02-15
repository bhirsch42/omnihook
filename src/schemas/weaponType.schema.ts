import { toLower } from "ramda";
import { z } from "zod";

export const weaponTypeSchema = z.preprocess(
  z.string().transform(toLower).parse,
  z.enum([
    "rifle",
    "cannon",
    "launcher",
    "cqb",
    "nexus",
    "melee",
    "???",
    "any",
    "special",
    "spool weapon",
  ])
);

export type WeaponType = z.infer<typeof weaponTypeSchema>;
