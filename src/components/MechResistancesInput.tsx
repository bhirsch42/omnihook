import { useAppDispatch, useAppSelector } from "../store/hooks";
import { MultiSelectInput } from "./MultiSelectInput";
import { titleize } from "inflection";
import { mechStatusUpdated, selectMechStatusById } from "../store/mechStatuses";
import { RESISTANCE_TYPES } from "../schemas/resistanceType.schema";

export function MechResistancesInput({
  mechStatusId,
}: {
  mechStatusId: string;
}) {
  const dispatch = useAppDispatch();

  const allResistances = RESISTANCE_TYPES;

  const currentResistances = useAppSelector((state) => {
    const mechResistance = selectMechStatusById(state, mechStatusId);
    if (!mechResistance)
      throw new Error(`Could not find mechResistance with id ${mechStatusId}`);
    return mechResistance?.resistances;
  });

  const options = allResistances.map((resistance) => ({
    id: resistance,
    value: resistance,
    label: titleize(resistance),
  }));

  const handleChange = (resistanceIds: string[]) => {
    dispatch(
      mechStatusUpdated({
        id: mechStatusId,
        changes: {
          resistances: resistanceIds,
        },
      })
    );
  };

  return (
    <MultiSelectInput
      options={options}
      onChange={handleChange}
      value={currentResistances}
    />
  );
}
