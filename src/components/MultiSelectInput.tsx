import { ReactNode, useRef } from "react";
import { Pill } from "./Pill";
import { Button } from "./Button";
import { Popover } from "./Popover";
import { without } from "ramda";

export type SelectOption<T> = {
  id: string | number;
  value: T;
  label: ReactNode;
};

export function MultiSelectInput<T>({
  options,
  value,
  onChange,
}: {
  options: SelectOption<T>[];
  value: T[];
  onChange: (newValue: T[]) => void;
}) {
  const dropdownRef = useRef<HTMLButtonElement>(null);

  const selectedOptions = value.map((o) => {
    const result = options.find((option) => option.value === o);
    if (!result)
      throw new Error(
        `Error in MultiSelectInput: value ${JSON.stringify(
          value
        )} is not in options ${JSON.stringify(options.map((o) => o.id))}}`
      );
    return result;
  });

  const unselectedOptions = options.filter(
    (option) => !value.includes(option.value)
  );

  const handleClickRemoveOption = (option: SelectOption<T>) => {
    onChange(without([option.value], value));
  };

  return (
    <div className="flex">
      <div className="flex items-center">
        {selectedOptions.map((option) => (
          <Pill
            key={option.id}
            className="mr-2"
            onClickRemove={() => handleClickRemoveOption(option)}
          >
            {option.label}
          </Pill>
        ))}
      </div>

      {unselectedOptions.length > 0 && (
        <Button size="sm" ref={dropdownRef}>
          Add
        </Button>
      )}

      <Popover
        targetRef={dropdownRef}
        render={({ close }) => {
          const handleSelectOption = (option: SelectOption<T>) => {
            onChange([...value, option.value]);
            close();
          };

          return (
            <div className="p-2 bg-bgcolor-700 shadow-lg rounded m-1">
              <div className="flex flex-wrap -mr-1 -mb-1">
                {" "}
                {unselectedOptions.map((option) => (
                  <Pill
                    className="mr-1 mb-1"
                    key={option.id}
                    onClick={() => handleSelectOption(option)}
                  >
                    {option.label}
                  </Pill>
                ))}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
