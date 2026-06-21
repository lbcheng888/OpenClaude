// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
var jpi=X((Zgn)=>{Object.defineProperty(Zgn,"__esModule",{value:!0});Zgn.getMachineId=void 0;var gYu=require("fs"),_Yu=Xi();async function yYu(){let e=["/etc/machine-id","/var/lib/dbus/machine-id"];for(let t of e)try{return(await gYu.promises.readFile(t,{encoding:"utf8"})).trim()}catch(n){_Yu.diag.debug(`error reading machine id: ${n}`)}return}Zgn.getMachineId=yYu});
export {jpi};
