// @ts-nocheck
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {zg} from "./m2752.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
var bIe;
var L2n=b(()=>{Xr();bIe=zg({kind:"permission_file",payload:we(()=>E.custom((e)=>typeof e==="object"&&e!==null&&("requestId"in e)&&("toolName"in e)&&("permissionResult"in e)&&("filePath"in e)&&("operationType"in e))),result:we(()=>E.custom((e)=>typeof e==="object"&&e!==null&&("behavior"in e))),default:{behavior:"cancelled"}})});
export {bIe,L2n};
