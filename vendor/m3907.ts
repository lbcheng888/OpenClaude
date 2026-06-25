// @ts-nocheck
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {s_} from "./m2764.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
var Lut;
var huo=b(()=>{Qr();Lut=s_({kind:"permission_exit_plan_mode_v2",payload:ve(()=>C.custom((e)=>typeof e==="object"&&e!==null&&("requestId"in e)&&("toolName"in e)&&("permissionResult"in e)&&("plan"in e))),result:ve(()=>C.custom((e)=>typeof e==="object"&&e!==null&&("behavior"in e))),default:{behavior:"cancelled"}})});
export {Lut,huo};
