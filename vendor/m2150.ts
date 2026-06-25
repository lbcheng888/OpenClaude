// @ts-nocheck
import {Q} from "../runtime.ts";
import {ISn} from "./m2147.ts";
import {xi} from "./m2096.ts";
var Uyi=Q((PSn)=>{Object.defineProperty(PSn,"__esModule",{value:!0});PSn.getMachineId=void 0;var Usd=require("fs"),$sd=ISn(),Byi=xi();async function qsd(){try{return(await Usd.promises.readFile("/etc/hostid",{encoding:"utf8"})).trim()}catch(e){Byi.diag.debug(`error reading machine id: ${e}`)}try{return(await(0,$sd.execAsync)("kenv -q smbios.system.uuid")).stdout.trim()}catch(e){Byi.diag.debug(`error reading machine id: ${e}`)}return}PSn.getMachineId=qsd});
export {Uyi};
