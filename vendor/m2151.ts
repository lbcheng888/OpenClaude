// @ts-nocheck
import {Q} from "../runtime.ts";
import {ISn} from "./m2147.ts";
import {xi} from "./m2096.ts";
var qyi=Q((OSn)=>{Object.defineProperty(OSn,"__esModule",{value:!0});OSn.getMachineId=void 0;var $yi=require("process"),Wsd=ISn(),Gsd=xi();async function Vsd(){let t="%windir%\\System32\\REG.exe";if($yi.arch==="ia32"&&"PROCESSOR_ARCHITEW6432"in $yi.env)t="%windir%\\sysnative\\cmd.exe /c "+t;try{let r=(await(0,Wsd.execAsync)(`${t} QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid`)).stdout.split("REG_SZ");if(r.length===2)return r[1].trim()}catch(n){Gsd.diag.debug(`error reading machine id: ${n}`)}return}OSn.getMachineId=Vsd});
export {qyi};
