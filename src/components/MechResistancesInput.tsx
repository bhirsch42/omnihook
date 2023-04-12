import { useAppDispatch, useAppSelector } from "../store/hooks";
import { MultiSelectInput } from "./MultiSelectInput";
import { titleize } from "inflection";
import { mechStatusUpdated } from "../store/mechStatuses";
import {
  RESISTANCE_TYPES,
  ResistanceType,
} from "../schemas/resistanceType.schema";
import { selectMechStatusById } from "../store/mechStatuses/selectors/selectMechStatusById";

export function MechResistancesInput({
  mechStatusId,
}: {
  mechStatusId: string;
}) {
  const dispatch = useAppDispatch();

  const allResistances = RESISTANCE_TYPES;

  const { resistances: currentResistances } = useAppSelector(
    selectMechStatusById(mechStatusId)
  );

  const options = allResistances.map((resistance) => ({
    id: resistance,
    value: resistance,
    label: titleize(resistance),
  }));

  const handleChange = (resistanceIds: ResistanceType[]) => {
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
