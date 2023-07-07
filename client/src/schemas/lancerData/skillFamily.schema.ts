import { z } from "zod";

export const skillFamilySchema = z.enum(["str", "dex", "int", "cha", "Custom"]);

export type SkillFamily = z.infer<typeof skillFamilySchema>;
