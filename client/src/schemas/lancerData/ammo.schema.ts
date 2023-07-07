import { z } from "zod";
import { weaponSizeSchema } from "./weaponSize.schema";
import { weaponTypeSchema } from "./weaponType.schema";

export const ammoSchema = z.object({
  name: z.string(),
  detail: z.string(),
  allowed_sizes: weaponSizeSchema.array(),
  allowed_types: weaponTypeSchema.array(),
});

export type Ammo = z.infer<typeof ammoSchema>;
