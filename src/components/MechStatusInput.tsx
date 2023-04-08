import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectMechStatuses } from "../store/collections/selectors/selectMechStatuses";
import { MultiSelectInput } from "./MultiSelectInput";
import { titleize } from "inflection";
import { mechStatusUpdated, selectMechStatusById } from "../store/mechStatuses";

export function MechStatusInput({ mechStatusId }: { mechStatusId: string }) {
  const dispatch = useAppDispatch();

  const allStatuses = useAppSelector(selectMechStatuses);

  const currentStatuses = useAppSelector((state) => {
    const mechStatus = selectMechStatusById(state, mechStatusId);
    if (!mechStatus)
      throw new Error(`Could not find mechStatus with id ${mechStatusId}`);
    return mechStatus?.statuses;
  });

  const options = allStatuses.map((status) => ({
    id: status.id,
    value: status.id,
    label: titleize(status.name),
  }));

  const handleChange = (statusIds: string[]) => {
    dispatch(
      mechStatusUpdated({
        id: mechStatusId,
        changes: {
          statuses: statusIds,
        },
      })
    );
  };

  return (
    <MultiSelectInput
      options={options}
      onChange={handleChange}
      value={currentStatuses}
    />
  );
}
