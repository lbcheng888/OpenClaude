// @ts-nocheck
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {s_} from "./m2764.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
var B0e;
var R$n=b(()=>{Qr();B0e=s_({kind:"permission_file",payload:ve(()=>C.custom((e)=>typeof e==="object"&&e!==null&&("requestId"in e)&&("toolName"in e)&&("permissionResult"in e)&&("filePath"in e)&&("operationType"in e))),result:ve(()=>C.custom((e)=>typeof e==="object"&&e!==null&&("behavior"in e))),default:{behavior:"cancelled"}})});
export {B0e,R$n};
