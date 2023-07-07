import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectMechStatuses } from "../store/collections/selectors/selectMechStatuses";
import { MultiSelectInput } from "./MultiSelectInput";
import { titleize } from "inflection";
import { mechStatusUpdated } from "../store/mechStatuses";
import { selectMechStatusById } from "../store/mechStatuses/selectors/selectMechStatusById";
import { StatusType } from "../schemas/lancerData/statusType.schema";

export function MechStatusInput({
  mechStatusId,
}: {
  mechStatusId: StatusType;
}) {
  const dispatch = useAppDispatch();

  const allStatuses = useAppSelector(selectMechStatuses);

  const { statuses: currentStatuses } = useAppSelector(
    selectMechStatusById(mechStatusId)
  );

  const options = allStatuses.map((status) => ({
    id: status.id,
    value: status.id as StatusType,
    label: titleize(status.name),
  }));

  const handleChange = (statusIds: StatusType[]) => {
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
    <MultiSelectInput<StatusType>
      options={options}
      onChange={handleChange}
      value={currentStatuses}
    />
  );
}
