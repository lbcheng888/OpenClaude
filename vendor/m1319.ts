// @ts-nocheck
import {m2s,f2s,h2s} from "./m1318.ts";
import {b} from "../runtime.ts";
var g2s=(e)=>({setRetryStrategy(t){e.retryStrategy=t},retryStrategy(){return e.retryStrategy}}),_2s=(e)=>{let t={};return t.retryStrategy=e.retryStrategy(),t};
var rpn=(e)=>Object.assign(m2s(e),g2s(e)),eUu,pIr=(e)=>Object.assign(f2s(e),_2s(e));
var y2s=b(()=>{h2s();eUu=rpn});
export {g2s,_2s,rpn,eUu,pIr,y2s};
