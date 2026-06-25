// @ts-nocheck
import {Q} from "../runtime.ts";
import {pBn} from "./m3704.ts";
import {xi} from "./m2096.ts";
var f0a=Q((gBn)=>{Object.defineProperty(gBn,"__esModule",{value:!0});gBn.getMachineId=void 0;var m0a=require("process"),kTp=pBn(),HTp=xi();async function ITp(){let t="%windir%\\System32\\REG.exe";if(m0a.arch==="ia32"&&"PROCESSOR_ARCHITEW6432"in m0a.env)t="%windir%\\sysnative\\cmd.exe /c "+t;try{let r=(await(0,kTp.execAsync)(`${t} QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid`)).stdout.split("REG_SZ");if(r.length===2)return r[1].trim()}catch(n){HTp.diag.debug(`error reading machine id: ${n}`)}return}gBn.getMachineId=ITp});
export {f0a};
