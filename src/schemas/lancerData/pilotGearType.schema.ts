import { z } from "zod";

export const pilotGearTypeSchema = z.enum(["Weapon", "Gear", "Armor"]);

export type PilotGearType = z.infer<typeof pilotGearTypeSchema>;
