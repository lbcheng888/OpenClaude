// @ts-nocheck
import {X} from "../runtime.ts";
import {y1n} from "./m3688.ts";
import {Xi} from "./m2091.ts";
var ZEa=X((E1n)=>{Object.defineProperty(E1n,"__esModule",{value:!0});E1n.getMachineId=void 0;var QEa=require("process"),$lp=y1n(),qlp=Xi();async function jlp(){let t="%windir%\\System32\\REG.exe";if(QEa.arch==="ia32"&&"PROCESSOR_ARCHITEW6432"in QEa.env)t="%windir%\\sysnative\\cmd.exe /c "+t;try{let r=(await(0,$lp.execAsync)(`${t} QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid`)).stdout.split("REG_SZ");if(r.length===2)return r[1].trim()}catch(n){qlp.diag.debug(`error reading machine id: ${n}`)}return}E1n.getMachineId=jlp});
export {ZEa};
