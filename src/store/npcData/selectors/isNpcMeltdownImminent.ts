import { RootState } from "../..";
import { selectIsNpcDestroyed } from "./selectIsNpcDestroyed";
import { selectNpcById } from "./selectNpcById";

export const selectIsNpcMeltdownImminent =
  (id: string) => (state: RootState) => {
    const isDestroyed = selectIsNpcDestroyed(id)(state);
    if (isDestroyed) return false;
    const npc = selectNpcById(id)(state);
    return npc.stats.stress === 0;
  };
