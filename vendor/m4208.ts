// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {s_} from "./m2764.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
var ygo={};
ft(ygo,{workflowPermissionDialog:()=>workflowPermissionDialog});
var workflowPermissionDialog;
var Tgo=b(()=>{Qr();workflowPermissionDialog=s_({kind:"permission_workflow",payload:ve(()=>C.custom((e)=>typeof e==="object"&&e!==null&&("requestId"in e)&&("toolName"in e)&&("permissionResult"in e)&&("script"in e))),result:ve(()=>C.custom((e)=>typeof e==="object"&&e!==null&&("behavior"in e))),default:{behavior:"cancelled"}})});
export {ygo,workflowPermissionDialog,Tgo};
