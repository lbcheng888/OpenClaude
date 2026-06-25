// @ts-nocheck
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {s_} from "./m2764.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
var V9t;
var fuo=b(()=>{Qr();V9t=s_({kind:"permission_enter_plan_mode",payload:ve(()=>C.custom((e)=>typeof e==="object"&&e!==null&&("requestId"in e)&&("toolName"in e)&&("permissionResult"in e))),result:ve(()=>C.custom((e)=>typeof e==="object"&&e!==null&&("behavior"in e))),default:{behavior:"cancelled"}})});
export {V9t,fuo};
