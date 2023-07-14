import { z } from "zod";
import { mountSchema } from "./mount.schema";

export const mechSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string(),
    pilotId: z.string().uuid(),
    frameId: z.string(),
    mounts: mountSchema.array(),
  })
  .transform((o) => ({ ...o, mounts: o.mounts })); // weird fix for union type inference

export type Mech = z.infer<typeof mechSchema>;
