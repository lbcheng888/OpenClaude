// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
var Fyi=Q((DSn)=>{Object.defineProperty(DSn,"__esModule",{value:!0});DSn.getMachineId=void 0;var Nsd=require("fs"),Fsd=xi();async function Bsd(){let e=["/etc/machine-id","/var/lib/dbus/machine-id"];for(let t of e)try{return(await Nsd.promises.readFile(t,{encoding:"utf8"})).trim()}catch(n){Fsd.diag.debug(`error reading machine id: ${n}`)}return}DSn.getMachineId=Bsd});
export {Fyi};
