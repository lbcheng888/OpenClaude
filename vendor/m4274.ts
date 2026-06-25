// @ts-nocheck
import {z5s,vd} from "../src/session/1465_promise.ts";
import {Efe,K0t} from "./m2034.ts";
import {toCompatSessionId} from "../src/core/2809_toInfraSessionId.ts";
import {b} from "../runtime.ts";
function M_o(e){let t=L_o;L_o=e,z5s(l$p()??null).catch(()=>{});let n=t!==null&&!t.outboundOnly,r=e!==null&&!e.outboundOnly;if(n!==r||n&&r&&t?.bridgeSessionId!==e?.bridgeSessionId)Efe()}
function yS(){return L_o}
function l$p(){let e=yS();return e?toCompatSessionId(e.bridgeSessionId):void 0}
var L_o=null;
var WB=b(()=>{vd();K0t()});
export {M_o,yS,l$p,L_o,WB};
