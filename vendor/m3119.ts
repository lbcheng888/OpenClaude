// @ts-nocheck
import {X} from "../runtime.ts";
import {mT} from "./m1464.ts";
import {mkn} from "./m3104.ts";
import {QLt} from "./m3106.ts";
import {Eee} from "./m3098.ts";
import {Pxe} from "./m3099.ts";
import {k$e} from "./m3101.ts";
var dXi=X((Xjh,uXi)=>{var OUd=mT(),KVr=require("path"),LUd=mkn().copy,cXi=QLt().remove,MUd=Eee().mkdirp,NUd=Pxe().pathExists,aXi=k$e();function BUd(e,t,n,r){if(typeof n==="function")r=n,n={};n=n||{};let o=n.overwrite||n.clobber||!1;aXi.checkPaths(e,t,"move",n,(s,i)=>{if(s)return r(s);let{srcStat:a,isChangingCase:l=!1}=i;aXi.checkParentPaths(e,a,t,"move",(c)=>{if(c)return r(c);if(FUd(t))return lXi(e,t,o,l,r);MUd(KVr.dirname(t),(u)=>{if(u)return r(u);return lXi(e,t,o,l,r)})})})}function FUd(e){let t=KVr.dirname(e);return KVr.parse(t).root===t}function lXi(e,t,n,r,o){if(r)return VVr(e,t,n,o);if(n)return cXi(t,(s)=>{if(s)return o(s);return VVr(e,t,n,o)});NUd(t,(s,i)=>{if(s)return o(s);if(i)return o(Error("dest already exists."));return VVr(e,t,n,o)})}function VVr(e,t,n,r){OUd.rename(e,t,(o)=>{if(!o)return r();if(o.code!=="EXDEV")return r(o);return UUd(e,t,n,r)})}function UUd(e,t,n,r){LUd(e,t,{overwrite:n,errorOnExist:!0},(s)=>{if(s)return r(s);return cXi(e,r)})}uXi.exports=BUd});
export {dXi};
