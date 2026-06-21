// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
var YEa=X((S1n)=>{Object.defineProperty(S1n,"__esModule",{value:!0});S1n.getMachineId=void 0;var Llp=require("fs"),Mlp=Xi();async function Nlp(){let e=["/etc/machine-id","/var/lib/dbus/machine-id"];for(let t of e)try{return(await Llp.promises.readFile(t,{encoding:"utf8"})).trim()}catch(n){Mlp.diag.debug(`error reading machine id: ${n}`)}return}S1n.getMachineId=Nlp});
export {YEa};
