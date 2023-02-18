import { z } from "zod";

export const fittingSizeSchema = z.enum([
  "Auxiliary",
  "Main",
  "Flex",
  "Heavy",
  "Integrated",
]);

export type FittingSize = z.infer<typeof fittingSizeSchema>;
