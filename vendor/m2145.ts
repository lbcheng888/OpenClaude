// @ts-nocheck
import {X} from "../runtime.ts";
import {Xgn} from "./m2142.ts";
import {Xi} from "./m2091.ts";
var Gpi=X((e_n)=>{Object.defineProperty(e_n,"__esModule",{value:!0});e_n.getMachineId=void 0;var TYu=require("fs"),SYu=Xgn(),Wpi=Xi();async function bYu(){try{return(await TYu.promises.readFile("/etc/hostid",{encoding:"utf8"})).trim()}catch(e){Wpi.diag.debug(`error reading machine id: ${e}`)}try{return(await(0,SYu.execAsync)("kenv -q smbios.system.uuid")).stdout.trim()}catch(e){Wpi.diag.debug(`error reading machine id: ${e}`)}return}e_n.getMachineId=bYu});
export {Gpi};
