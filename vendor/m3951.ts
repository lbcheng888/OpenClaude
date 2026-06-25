// @ts-nocheck
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {s_} from "./m2764.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
var u3t;
var udo=b(()=>{Qr();u3t=s_({kind:"permission_skill",payload:ve(()=>C.custom((e)=>typeof e==="object"&&e!==null&&("requestId"in e)&&("toolName"in e)&&("permissionResult"in e)&&("skill"in e))),result:ve(()=>C.custom((e)=>typeof e==="object"&&e!==null&&("behavior"in e))),default:{behavior:"cancelled"}})});
export {u3t,udo};
