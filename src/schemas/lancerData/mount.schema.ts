import { z } from "zod";

export const mountSchema = z.enum([
  "Flex",
  "Heavy",
  "Main",
  "Main/Aux",
  "Aux/Aux",
]);

export type Mount = z.infer<typeof mountSchema>;
