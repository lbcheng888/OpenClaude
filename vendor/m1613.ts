// @ts-nocheck
import {b} from "../runtime.ts";
import {cHt} from "./m1612.ts";
function uHt(){}
function Gfn(e,t,n){if(!t||Rzs[e]>Rzs[n])return uHt;else return t[e].bind(t)}
function Vfn(e){let t=e.logger,n=e.logLevel??"off";if(!t)return uqu;let r=vzs.get(t);if(r&&r[0]===n)return r[1];let o={error:Gfn("error",t,n),warn:Gfn("warn",t,n),info:Gfn("info",t,n),debug:Gfn("debug",t,n)};return vzs.set(t,[n,o]),o}
var Rzs,uqu,vzs;
var fPr=b(()=>{cHt();Rzs={off:0,error:200,warn:300,info:400,debug:500};uqu={error:uHt,warn:uHt,info:uHt,debug:uHt},vzs=new WeakMap});
export {uHt,Gfn,Vfn,Rzs,uqu,vzs,fPr};
