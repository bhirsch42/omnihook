import { z } from "zod";

export const deployableTypeSchema = z.enum(["Deployable", "Drone", "Mine"]);

export type DeployableType = z.infer<typeof deployableTypeSchema>;
