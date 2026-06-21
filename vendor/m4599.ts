// @ts-nocheck
import {b} from "../runtime.ts";
import {Lr} from "./m578.ts";
import {je} from "./m577.ts";
import {uul,cul} from "./m4598.ts";
var iKp,eSo;
var dul=b(()=>{Lr();iKp={name:"doctor",description:"Diagnose and verify your Claude Code installation and settings",isEnabled:()=>!je.DISABLE_DOCTOR_COMMAND,type:"local-jsx",immediate:!0,requires:{ink:!0},load:()=>Promise.resolve().then(() => (uul(),cul))},eSo=iKp});
export {iKp,eSo,dul};
