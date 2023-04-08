import { MultiSelectInput } from "./MultiSelectInput";
import { RESISTANCE_TYPES } from "../schemas/resistanceType.schema";

export function MechResistancesInput({
  onChange,
  value,
}: {
  onChange: (newValue: string[]) => void;
  value: string[];
}) {
  const options = RESISTANCE_TYPES.map((resistanceType) => ({
    id: resistanceType,
    value: resistanceType,
    label: resistanceType,
  }));

  return (
    <MultiSelectInput options={options} onChange={onChange} value={value} />
  );
}
