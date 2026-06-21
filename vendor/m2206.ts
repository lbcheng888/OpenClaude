// @ts-nocheck
import {b} from "../runtime.ts";
function cE(e,t){return Bun.semver.order(e,t)===1}
function b0(e,t){return Bun.semver.order(e,t)>=0}
function tZ(e,t){return Bun.semver.order(e,t)===-1}
function mQe(e,t){return Bun.semver.order(e,t)<=0}
function QNr(e,t){return Bun.semver.satisfies(e,t)}
function K_n(e,t,n={}){let r=setInterval(e,t);if(n.unref)r.unref?.();return{[Symbol.dispose]:()=>clearInterval(r)}}
function SXu(e){var t=e==null?0:e.length;return t?e[t-1]:void 0}
var w4;
var BHt=b(()=>{w4=SXu});
export {cE,b0,tZ,mQe,QNr,K_n,SXu,w4,BHt};
