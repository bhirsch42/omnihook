import { toLower } from "ramda";
import { z } from "zod";

export const synergyLocationSchema = z.preprocess(
  z.string().transform(toLower).parse,
  z.enum([
    "overcharge",
    "boost",
    "ram",
    "grapple",
    "quick_tech",
    "bolster",
    "scan",
    "lock_on",
    "hide",
    "search",
    "eject",
    "prepare",
    "self_destruct",
    "shut_down",
    "reload",
    "barrage",
    "full_tech",
    "stabilize",
    "disengage",
    "improvised_attack",
    "full_activation",
    "boot_up",
    "dismount",
    "skill_check",
    "active_effects",
    "engineering",
    "hull",
    "systems",
    "agility",
    "other",
    "hase",
    "move",
    "weapon",
    "brace",
    "overwatch",
    "system",
    "rest",
    "tech",
    "cascade",
  ])
);

export type SynergyLocation = z.infer<typeof synergyLocationSchema>;
