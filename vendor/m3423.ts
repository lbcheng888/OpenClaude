// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ag} from "./m2133.ts";
class SQr{_spanProcessors;constructor(e){this._spanProcessors=e}forceFlush(){let e=[];for(let t of this._spanProcessors)e.push(t.forceFlush());return new Promise((t)=>{Promise.all(e).then(()=>{t()}).catch((n)=>{Gpa.globalErrorHandler(n||Error("MultiSpanProcessor: forceFlush failed")),t()})})}onStart(e,t){for(let n of this._spanProcessors)n.onStart(e,t)}onEnd(e){for(let t of this._spanProcessors)t.onEnd(e)}shutdown(){let e=[];for(let t of this._spanProcessors)e.push(t.shutdown());return new Promise((t,n)=>{Promise.all(e).then(()=>{t()},n)})}}
var Gpa;
var Vpa=b(()=>{Gpa=M(ag(),1)});
export {SQr,Gpa,Vpa};
