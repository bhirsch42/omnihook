import { z } from "zod";
import { FrameStats, frameStatsSchema } from "./lancerData/frameStats.schema";

const FRAME_STAT_KEYS = [
  "armor",
  "size",
  "structure",
  "stress",
  "hp",
  "evasion",
  "edef",
  "heatcap",
  "repcap",
  "sensorRange",
  "techAttack",
  "save",
  "speed",
  "sp",
] as const satisfies Readonly<(keyof FrameStats)[]>;

export const MECH_STAT_KEYS = [
  ...FRAME_STAT_KEYS,
  "limitedBonus",
  "attack",
] as const;

export const mechStatKeySchema = z.enum(MECH_STAT_KEYS);

export type MechStatKey = z.infer<typeof mechStatKeySchema>;
