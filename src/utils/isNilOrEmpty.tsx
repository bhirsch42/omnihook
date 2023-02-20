import { isEmpty, isNil } from "ramda";

export function isNilOrEmpty(arr?: any[] | null) {
  return isNil(arr) || isEmpty(arr);
}
