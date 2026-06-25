// @ts-nocheck
import {nfa,rfa} from "./m3302.ts";
import {b} from "../runtime.ts";
function rQd(e){var t=e.length;return t?e[nfa(0,t-1)]:void 0}
var sOn;
var xeo=b(()=>{rfa();sOn=rQd});
export {rQd,sOn,xeo};
