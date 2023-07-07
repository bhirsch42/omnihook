import clsx from "clsx";
import { ModifiedValue } from "../schemas/modifiedValue.schema";
import { evaluateModifiedValue } from "../utils/evaluateModifiedValue";

export function ModifiedValueView({
  modifiedValue,
  className,
  prefix,
}: {
  modifiedValue: ModifiedValue;
  className?: string;
  prefix?: React.ReactNode;
}) {
  return (
    <div className={clsx(className)}>
      {prefix}
      {modifiedValue.value}
    </div>
  );
}
