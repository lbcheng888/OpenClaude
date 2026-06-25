// @ts-nocheck
import {Ne} from "./m583.ts";
import {b} from "../runtime.ts";
import {Ir} from "./m584.ts";
function HW(){let e=Ne.MCP_TIMEOUT;return e&&e>0?e:30000}
function $sa(){let e=Ne.MCP_CONNECT_TIMEOUT_MS;return e&&e>0?e:5000}
var Vst=b(()=>{Ir()});
export {HW,$sa,Vst};
