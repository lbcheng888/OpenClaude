// @ts-nocheck
import {A_,zf} from "./m133.ts";
import {setCwdState,getCwdState,getOriginalCwd,lt} from "../src/session/0132_sent.ts";
import {b} from "../runtime.ts";
function kou(e,t){return Drn.run({cwd:A_(e)},t)}
function Npe(e,t){return kou(e??isTmuxControlMode(),t)}
function D1e(){return Drn.getStore()!==void 0}
function wyr(e){let t=Drn.getStore();if(t)t.cwd=A_(e);else setCwdState(e)}
function Prn(){return Drn.getStore()?.cwd??getCwdState()}
function isTmuxControlMode(){try{return Prn()}catch{return getOriginalCwd()}}
var Rrs,Drn;
var Po=b(()=>{lt();zf();Rrs=require("async_hooks"),Drn=new Rrs.AsyncLocalStorage});
export {kou,Npe,D1e,wyr,Prn,isTmuxControlMode,Rrs,Drn,Po};
