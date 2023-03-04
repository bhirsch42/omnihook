import rawLancerData from "lancer-data";
import { lancerCollections, lancerData } from "./data/lancerData";

declare global {
  interface Window {
    debug: any;
  }
}

export function initDebug() {
  window.debug = { rawLancerData, lancerData, lancerCollections };
}
