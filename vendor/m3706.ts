// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
var u0a=Q((fBn)=>{Object.defineProperty(fBn,"__esModule",{value:!0});fBn.getMachineId=void 0;var ETp=require("fs"),CTp=xi();async function ATp(){let e=["/etc/machine-id","/var/lib/dbus/machine-id"];for(let t of e)try{return(await ETp.promises.readFile(t,{encoding:"utf8"})).trim()}catch(n){CTp.diag.debug(`error reading machine id: ${n}`)}return}fBn.getMachineId=ATp});
export {u0a};
