import { Manufacturer } from "../schemas/manufacturer.schema";

export function ManufacturerView({
  manufacturer,
}: {
  manufacturer: Manufacturer;
}) {
  return (
    <div id={manufacturer.id}>
      <div className="font-bold text-lg">{manufacturer.name}</div>
      <div
        dangerouslySetInnerHTML={{ __html: manufacturer.quote }}
        className="border-l-2 border-accentcolor-400 pl-3 ml-3 my-2"
      ></div>
      <div dangerouslySetInnerHTML={{ __html: manufacturer.description }}></div>
    </div>
  );
}
