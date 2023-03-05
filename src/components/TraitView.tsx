import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Trait } from "../schemas/lancerData/trait.schema";
import { Button } from "./Button";
import { AttackStatsTable } from "./WeaponStatsTable";

export function TraitView({
  trait,
  isOpen: _isOpen,
  className,
}: {
  trait: Trait;
  isOpen?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`border border-l-4 border-bgcolor-700 border-l-bgcolor-500 ${className}`}
    >
      <div className="flex flex-wrap items-center w-full p-2 transition-colors whitespace-nowrap">
        <div className="pr-3 mr-auto text-sm font-bold">{trait.name}</div>
        <div className="text-sm italic">{trait.use}</div>
      </div>
      <div className="flex mx-2 mb-2">
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: trait.description }}
        ></div>
      </div>
    </div>
  );
}
