// @ts-nocheck
import {tT,c2} from "./m13.ts";
import {IBo,DBo} from "./m16.ts";
import {mWe,N7t} from "./m14.ts";
import {xde,Ier} from "./m17.ts";
import {b} from "../runtime.ts";
function apc(e){if(!tT(e)||IBo(e))return!1;var t=mWe(e)?ipc:tpc;return t.test(xde(e))}
var epc,tpc,npc,rpc,opc,spc,ipc,PBo;
var OBo=b(()=>{N7t();DBo();c2();Ier();epc=/[\\^$.*+?()[\]{}|]/g,tpc=/^\[object .+?Constructor\]$/,npc=Function.prototype,rpc=Object.prototype,opc=npc.toString,spc=rpc.hasOwnProperty,ipc=RegExp("^"+opc.call(spc).replace(epc,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");PBo=apc});
export {apc,epc,tpc,npc,rpc,opc,spc,ipc,PBo,OBo};
