// @ts-nocheck
import {Q} from "../runtime.ts";
import {oT} from "./m1469.ts";
import {nxn} from "./m3114.ts";
import {vNt} from "./m3116.ts";
import {Tee} from "./m3108.ts";
import {bHe} from "./m3109.ts";
import {D9e} from "./m3111.ts";
var ooa=Q((UZg,roa)=>{var hGd=oT(),kJr=require("path"),gGd=nxn().copy,noa=vNt().remove,_Gd=Tee().mkdirp,yGd=bHe().pathExists,eoa=D9e();function TGd(e,t,n,r){if(typeof n==="function")r=n,n={};n=n||{};let o=n.overwrite||n.clobber||!1;eoa.checkPaths(e,t,"move",n,(s,i)=>{if(s)return r(s);let{srcStat:a,isChangingCase:l=!1}=i;eoa.checkParentPaths(e,a,t,"move",(c)=>{if(c)return r(c);if(SGd(t))return toa(e,t,o,l,r);_Gd(kJr.dirname(t),(u)=>{if(u)return r(u);return toa(e,t,o,l,r)})})})}function SGd(e){let t=kJr.dirname(e);return kJr.parse(t).root===t}function toa(e,t,n,r,o){if(r)return wJr(e,t,n,o);if(n)return noa(t,(s)=>{if(s)return o(s);return wJr(e,t,n,o)});yGd(t,(s,i)=>{if(s)return o(s);if(i)return o(Error("dest already exists."));return wJr(e,t,n,o)})}function wJr(e,t,n,r){hGd.rename(e,t,(o)=>{if(!o)return r();if(o.code!=="EXDEV")return r(o);return bGd(e,t,n,r)})}function bGd(e,t,n,r){gGd(e,t,{overwrite:n,errorOnExist:!0},(s)=>{if(s)return r(s);return noa(e,r)})}roa.exports=TGd});
export {ooa};
