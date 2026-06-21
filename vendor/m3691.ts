// @ts-nocheck
import {X} from "../runtime.ts";
import {y1n} from "./m3688.ts";
import {Xi} from "./m2091.ts";
var XEa=X((b1n)=>{Object.defineProperty(b1n,"__esModule",{value:!0});b1n.getMachineId=void 0;var Blp=require("fs"),Flp=y1n(),JEa=Xi();async function Ulp(){try{return(await Blp.promises.readFile("/etc/hostid",{encoding:"utf8"})).trim()}catch(e){JEa.diag.debug(`error reading machine id: ${e}`)}try{return(await(0,Flp.execAsync)("kenv -q smbios.system.uuid")).stdout.trim()}catch(e){JEa.diag.debug(`error reading machine id: ${e}`)}return}b1n.getMachineId=Ulp});
export {XEa};
