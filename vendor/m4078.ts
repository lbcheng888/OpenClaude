// @ts-nocheck
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {zg} from "./m2752.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
var Y$t;
var Qlo=b(()=>{Xr();Y$t=zg({kind:"permission_monitor",payload:we(()=>E.custom((e)=>typeof e==="object"&&e!==null&&("requestId"in e)&&("toolName"in e)&&("permissionResult"in e)&&("intervalMs"in e))),result:we(()=>E.custom((e)=>typeof e==="object"&&e!==null&&("behavior"in e))),default:{behavior:"cancelled"}})});
export {Y$t,Qlo};
