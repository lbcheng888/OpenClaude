// @ts-nocheck
import {Q} from "../runtime.ts";
import {oT} from "./m1469.ts";
import {j0n} from "./m3084.ts";
import {yNt} from "./m3086.ts";
import {_ee} from "./m3078.ts";
import {gHe} from "./m3079.ts";
import {I9e} from "./m3081.ts";
var pna=Q((dZg,dna)=>{var R8d=oT(),hJr=require("path"),v8d=j0n().copy,una=yNt().remove,w8d=_ee().mkdirp,k8d=gHe().pathExists,lna=I9e();function H8d(e,t,n,r){if(typeof n==="function")r=n,n={};n=n||{};let o=n.overwrite||n.clobber||!1;lna.checkPaths(e,t,"move",n,(s,i)=>{if(s)return r(s);let{srcStat:a,isChangingCase:l=!1}=i;lna.checkParentPaths(e,a,t,"move",(c)=>{if(c)return r(c);if(I8d(t))return cna(e,t,o,l,r);w8d(hJr.dirname(t),(u)=>{if(u)return r(u);return cna(e,t,o,l,r)})})})}function I8d(e){let t=hJr.dirname(e);return hJr.parse(t).root===t}function cna(e,t,n,r,o){if(r)return fJr(e,t,n,o);if(n)return una(t,(s)=>{if(s)return o(s);return fJr(e,t,n,o)});k8d(t,(s,i)=>{if(s)return o(s);if(i)return o(Error("dest already exists."));return fJr(e,t,n,o)})}function fJr(e,t,n,r){R8d.rename(e,t,(o)=>{if(!o)return r();if(o.code!=="EXDEV")return r(o);return x8d(e,t,n,r)})}function x8d(e,t,n,r){v8d(e,t,{overwrite:n,errorOnExist:!0},(s)=>{if(s)return r(s);return una(e,r)})}dna.exports=H8d});
export {pna};
