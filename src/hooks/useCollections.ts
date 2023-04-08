import { selectCollections } from "../store/collections/selectors/selectCollections";
import { useAppSelector } from "../store/hooks";

export function useCollections() {
  return useAppSelector(selectCollections);
}
