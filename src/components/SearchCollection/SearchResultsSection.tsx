import { ReactNode } from "react";
import { Collection } from "../../utils/collection";

type SearchResultsSectionItem = {
  id: string;
  name: string;
};

export type SearchResultsSectionProps = {
  query: string;
  collection: Collection<SearchResultsSectionItem>;
  renderItem: (item: SearchResultsSectionItem) => React.ReactNode;
  label?: ReactNode;
  className?: string;
};

export function SearchResultsSection<T>({
  query,
  collection,
  renderItem,
  label,
  className,
}: SearchResultsSectionProps) {
  const items = query === "" ? collection.all() : collection.search(query);

  return items.length > 0 ? (
    <div className={className}>
      {label && <div className="mb-3">{label}</div>}
      {items.map(renderItem)}
    </div>
  ) : null;
}
