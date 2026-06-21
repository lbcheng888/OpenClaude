// @ts-nocheck
import {A_,ng} from "./m132.ts";
import {setCwdState,getCwdState,getOriginalCwd,lt} from "../src/session/0131_sent.ts";
import {b} from "../runtime.ts";
function dzc(e,t){return Xen.run({cwd:A_(e)},t)}
function kpe(e,t){return dzc(e??Pt(),t)}
function FMe(){return Xen.getStore()!==void 0}
function Qmr(e){let t=Xen.getStore();if(t)t.cwd=A_(e);else setCwdState(e)}
function Qen(){return Xen.getStore()?.cwd??getCwdState()}
function Pt(){try{return Qen()}catch{return getOriginalCwd()}}
var xXo,Xen;
var Go=b(()=>{lt();ng();xXo=require("async_hooks"),Xen=new xXo.AsyncLocalStorage});
export {dzc,kpe,FMe,Qmr,Qen,Pt,xXo,Xen,Go};
