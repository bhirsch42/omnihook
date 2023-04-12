import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectMechConditions } from "../store/collections/selectors/selectMechConditions";
import { MultiSelectInput } from "./MultiSelectInput";
import { titleize } from "inflection";
import { mechStatusUpdated } from "../store/mechStatuses";
import { selectMechStatusById } from "../store/mechStatuses/selectors/selectMechStatusById";
import { ConditionType } from "../schemas/lancerData/conditionType.schema";

export function MechConditionsInput({
  mechStatusId,
}: {
  mechStatusId: string;
}) {
  const dispatch = useAppDispatch();

  const allConditions = useAppSelector(selectMechConditions);

  const { conditions: currentConditions } = useAppSelector(
    selectMechStatusById(mechStatusId)
  );

  const options = allConditions.map((condition) => ({
    id: condition.id,
    value: condition.id as ConditionType,
    label: titleize(condition.name),
  }));

  const handleChange = (conditionIds: ConditionType[]) => {
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
    <MultiSelectInput<ConditionType>
      options={options}
      onChange={handleChange}
      value={currentConditions}
    />
  );
}
