import { Range } from "../schemas/lancerData/range.schema";

export function RangeView({ range }: { range: Omit<Range, "override">[] }) {
  const rangeString = range
    .map((r) => `${r.val} ${r.type}`)
    .join(", ")
    .replace(" Range", "");

  return <span className="font-bold">{rangeString}</span>;
}
