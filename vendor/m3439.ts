// @ts-nocheck
import {b,x} from "../runtime.ts";
import {pg} from "./m2138.ts";
class rro{_spanProcessors;constructor(e){this._spanProcessors=e}forceFlush(){let e=[];for(let t of this._spanProcessors)e.push(t.forceFlush());return new Promise((t)=>{Promise.all(e).then(()=>{t()}).catch((n)=>{iSa.globalErrorHandler(n||Error("MultiSpanProcessor: forceFlush failed")),t()})})}onStart(e,t){for(let n of this._spanProcessors)n.onStart(e,t)}onEnd(e){for(let t of this._spanProcessors)t.onEnd(e)}shutdown(){let e=[];for(let t of this._spanProcessors)e.push(t.shutdown());return new Promise((t,n)=>{Promise.all(e).then(()=>{t()},n)})}}
var iSa;
var aSa=b(()=>{iSa=x(pg(),1)});
export {rro,iSa,aSa};
