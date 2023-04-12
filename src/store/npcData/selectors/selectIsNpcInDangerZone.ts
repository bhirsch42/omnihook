import { isNil } from "ramda";
import { RootState } from "../..";
import { selectIsNpcDestroyed } from "./selectIsNpcDestroyed";
import { selectNpcById } from "./selectNpcById";

export const selectIsNpcInDangerZone = (id: string) => (state: RootState) => {
  const isDestroyed = selectIsNpcDestroyed(id)(state);

  if (isDestroyed) return false;

  const npc = selectNpcById(id)(state);

  if (isNil(npc.stats.heat) || isNil(npc.stats.maxHeat)) {
    return false;
  }

  return npc.stats.heat >= Math.floor(npc.stats.maxHeat / 2);
};
