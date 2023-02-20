import { Manufacturer } from "../schemas/lancerData/manufacturer.schema";

export function ManufacturerView({
  manufacturer,
  className,
}: {
  manufacturer: Manufacturer;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -top-6" id={manufacturer.id}></div>
      <div className="text-lg font-bold">{manufacturer.name}</div>
      <div
        dangerouslySetInnerHTML={{ __html: manufacturer.quote }}
        className="pl-3 my-2 ml-3 border-l-2 border-accentcolor-400"
      ></div>
      <div dangerouslySetInnerHTML={{ __html: manufacturer.description }}></div>
    </div>
  );
}
