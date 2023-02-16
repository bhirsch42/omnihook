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
        className="border-l-2 border-green-400 pl-3 ml-3"
      ></div>
      <div dangerouslySetInnerHTML={{ __html: manufacturer.description }}></div>
    </div>
  );
}
