import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Falsy } from "ramda";
import { Fragment, ReactNode } from "react";

export type StatsTableRow = [IconDefinition, ReactNode, ReactNode] | Falsy;

export type StatsTableProps = {
  rows: StatsTableRow[];
  className?: string;
  fillHeight?: boolean;
};

export function StatsTable({
  rows,
  className,
  fillHeight,
  narrow,
}: StatsTableProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div
        className={`grid grid-cols-[auto_auto_1fr] gap-x-3 ${
          fillHeight ? "h-full" : ""
        }`}
      >
        {rows.filter(Boolean).map((row, i) => (
          <Fragment key={i}>
            <div className="flex items-center whitespace-nowrap">
              <FontAwesomeIcon icon={row[0]} className="text-bgcolor-400" />
            </div>
            <div className="flex items-center whitespace-nowrap">{row[1]}</div>
            <div className="flex items-center">{row[2]}</div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
