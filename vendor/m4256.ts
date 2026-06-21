// @ts-nocheck
import {Q$s,hp} from "../src/session/1460_promise.ts";
import {mfe,ykt} from "./m2029.ts";
import {toCompatSessionId} from "../src/core/2797_toInfraSessionId.ts";
import {b} from "../runtime.ts";
function Upo(e){let t=Fpo;Fpo=e,Q$s(qOp()??null).catch(()=>{});let n=t!==null&&!t.outboundOnly,r=e!==null&&!e.outboundOnly;if(n!==r||n&&r&&t?.bridgeSessionId!==e?.bridgeSessionId)mfe()}
function ES(){return Fpo}
function qOp(){let e=ES();return e?toCompatSessionId(e.bridgeSessionId):void 0}
var Fpo=null;
var EU=b(()=>{hp();ykt()});
export {Upo,ES,qOp,Fpo,EU};
