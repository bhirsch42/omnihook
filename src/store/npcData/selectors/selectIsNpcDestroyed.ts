import { RootState } from "../..";
import { selectNpcById } from "./selectNpcById";

export const selectIsNpcDestroyed = (id: string) => (state: RootState) => {
  const npc = selectNpcById(id)(state);
  return npc.stats.hp === 0;
};
