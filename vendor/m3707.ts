// @ts-nocheck
import {Q} from "../runtime.ts";
import {pBn} from "./m3704.ts";
import {xi} from "./m2096.ts";
var p0a=Q((hBn)=>{Object.defineProperty(hBn,"__esModule",{value:!0});hBn.getMachineId=void 0;var RTp=require("fs"),vTp=pBn(),d0a=xi();async function wTp(){try{return(await RTp.promises.readFile("/etc/hostid",{encoding:"utf8"})).trim()}catch(e){d0a.diag.debug(`error reading machine id: ${e}`)}try{return(await(0,vTp.execAsync)("kenv -q smbios.system.uuid")).stdout.trim()}catch(e){d0a.diag.debug(`error reading machine id: ${e}`)}return}hBn.getMachineId=wTp});
export {p0a};
