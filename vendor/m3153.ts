// @ts-nocheck
import {je} from "./m577.ts";
import {b} from "../runtime.ts";
import {Lr} from "./m578.ts";
function mW(){let e=je.MCP_TIMEOUT;return e&&e>0?e:30000}
function GQi(){let e=je.MCP_CONNECT_TIMEOUT_MS;return e&&e>0?e:5000}
var Grt=b(()=>{Lr()});
export {mW,GQi,Grt};
