// @ts-nocheck
import {b} from "../runtime.ts";
function fE(e,t){return Bun.semver.order(e,t)===1}
function U0(e,t){return Bun.semver.order(e,t)>=0}
function QQ(e,t){return Bun.semver.order(e,t)===-1}
function fet(e,t){return Bun.semver.order(e,t)<=0}
function w$r(e,t){return Bun.semver.satisfies(e,t)}
function Hbn(e,t,n={}){let r=setInterval(e,t);if(n.unref)r.unref?.();return{[Symbol.dispose]:()=>clearInterval(r)}}
function Gad(e){var t=e==null?0:e.length;return t?e[t-1]:void 0}
var z3;
var pDt=b(()=>{z3=Gad});
export {fE,U0,QQ,fet,w$r,Hbn,Gad,z3,pDt};
