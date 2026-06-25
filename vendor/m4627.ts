// @ts-nocheck
import {b} from "../runtime.ts";
import {Ir} from "./m584.ts";
import {Ne} from "./m583.ts";
import {V_l,W_l} from "./m4626.ts";
var unm,fvo;
var K_l=b(()=>{Ir();unm={name:"doctor",description:"Diagnose and verify your Claude Code installation and settings",isEnabled:()=>!Ne.DISABLE_DOCTOR_COMMAND,type:"local-jsx",immediate:!0,requires:{ink:!0},load:()=>Promise.resolve().then(() => (V_l(),W_l))},fvo=unm});
export {unm,fvo,K_l};
