// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {zg} from "./m2752.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
var wdo={};
isFullscreenWithTTY(wdo,{workflowPermissionDialog:()=>workflowPermissionDialog});
var workflowPermissionDialog;
var Rdo=b(()=>{Xr();workflowPermissionDialog=zg({kind:"permission_workflow",payload:we(()=>E.custom((e)=>typeof e==="object"&&e!==null&&("requestId"in e)&&("toolName"in e)&&("permissionResult"in e)&&("script"in e))),result:we(()=>E.custom((e)=>typeof e==="object"&&e!==null&&("behavior"in e))),default:{behavior:"cancelled"}})});
export {wdo,workflowPermissionDialog,Rdo};
