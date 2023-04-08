import { useAppSelector } from "../store/hooks";
import { MultiSelectInput } from "./MultiSelectInput";
import { titleize } from "inflection";
import { selectMechConditions } from "../store/collections/selectors/selectMechConditions";

export function MechConditionsInput({
  onChange,
  value,
}: {
  onChange: (newValue: string[]) => void;
  value: string[];
}) {
  const conditions = useAppSelector(selectMechConditions);

  const options = conditions.map((status) => ({
    id: status.id,
    value: status.id,
    label: titleize(status.name),
  }));

  return (
    <MultiSelectInput options={options} onChange={onChange} value={value} />
  );
}
