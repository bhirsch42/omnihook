import { RootState } from "../..";
import { Mech } from "../../../schemas/mech.schema";

export const selectMech =
  (id: string) =>
  (state: RootState): Mech => {
    const mech = state.mechs.all.find((p) => p.id === id);
    if (!mech) throw new Error(`Could not find mech with id: ${id}`);
    return mech;
  };
