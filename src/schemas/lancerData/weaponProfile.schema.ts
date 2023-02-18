import { z } from "zod";
import { actionSchema } from "./action.schema";
import { damageSchema } from "./damage.schema";
import { rangeSchema } from "./range.schema";
import { tagRefSchema } from "./tagRef.schema";

export const weaponProfileSchema = z.object({
  name: z.string(),
  damage: damageSchema.array(),
  range: rangeSchema.array(),
  effect: z.string().optional(),
  actions: actionSchema.array().optional(),
  tags: tagRefSchema.array().optional(),
});

export type WeaponProfile = z.infer<typeof weaponProfileSchema>;
