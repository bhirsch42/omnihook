import { Manufacturer } from "../schemas/lancerData/manufacturer.schema";
import { UserText } from "./UserText";

export function ManufacturerView({
  manufacturer,
  className,
}: {
  manufacturer: Manufacturer;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-lg font-bold">{manufacturer.name}</div>

      <UserText
        text={manufacturer.quote}
        className="pl-3 my-2 ml-3 border-l-2 border-accentcolor-400 italic"
      />

      <UserText text={manufacturer.description} />
    </div>
  );
}
