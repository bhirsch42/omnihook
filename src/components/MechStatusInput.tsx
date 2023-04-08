import { useAppSelector } from "../store/hooks";
import { selectMechStatuses } from "../store/collections/selectors/selectMechStatuses";
import { MultiSelectInput } from "./MultiSelectInput";
import { titleize } from "inflection";

export function MechStatusInput({
  onChange,
  value,
}: {
  onChange: (newValue: string[]) => void;
  value: string[];
}) {
  const statuses = useAppSelector(selectMechStatuses);

  const options = statuses.map((status) => ({
    id: status.id,
    value: status.id,
    label: titleize(status.name),
  }));

  return (
    <MultiSelectInput options={options} onChange={onChange} value={value} />
  );
}
