import { z } from "zod";

export const mountTypeSchema = z.enum([
  "Flex",
  "Heavy",
  "Main",
  "Main/Aux",
  "Aux/Aux",
  "Integrated",
]);

export type Mount = z.infer<typeof mountTypeSchema>;
