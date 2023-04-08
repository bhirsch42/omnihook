import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectMechConditions } from "../store/collections/selectors/selectMechConditions";
import { MultiSelectInput } from "./MultiSelectInput";
import { titleize } from "inflection";
import { mechStatusUpdated, selectMechStatusById } from "../store/mechStatuses";

export function MechConditionsInput({
  mechStatusId,
}: {
  mechStatusId: string;
}) {
  const dispatch = useAppDispatch();

  const allConditions = useAppSelector(selectMechConditions);

  const currentConditions = useAppSelector((state) => {
    const mechCondition = selectMechStatusById(state, mechStatusId);
    if (!mechCondition)
      throw new Error(`Could not find mechCondition with id ${mechStatusId}`);
    return mechCondition?.conditions;
  });

  const options = allConditions.map((condition) => ({
    id: condition.id,
    value: condition.id,
    label: titleize(condition.name),
  }));

  const handleChange = (conditionIds: string[]) => {
    dispatch(
      mechStatusUpdated({
        id: mechStatusId,
        changes: {
          conditions: conditionIds,
        },
      })
    );
  };

  return (
    <MultiSelectInput
      options={options}
      onChange={handleChange}
      value={currentConditions}
    />
  );
}
