// @ts-nocheck
import {X} from "../runtime.ts";
import {Xgn} from "./m2142.ts";
import {Xi} from "./m2091.ts";
var Kpi=X((t_n)=>{Object.defineProperty(t_n,"__esModule",{value:!0});t_n.getMachineId=void 0;var Vpi=require("process"),EYu=Xgn(),CYu=Xi();async function vYu(){let t="%windir%\\System32\\REG.exe";if(Vpi.arch==="ia32"&&"PROCESSOR_ARCHITEW6432"in Vpi.env)t="%windir%\\sysnative\\cmd.exe /c "+t;try{let r=(await(0,EYu.execAsync)(`${t} QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid`)).stdout.split("REG_SZ");if(r.length===2)return r[1].trim()}catch(n){CYu.diag.debug(`error reading machine id: ${n}`)}return}t_n.getMachineId=vYu});
export {Kpi};
