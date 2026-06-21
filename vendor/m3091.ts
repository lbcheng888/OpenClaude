// @ts-nocheck
import {X} from "../runtime.ts";
import {mT} from "./m1464.ts";
import {skn} from "./m3074.ts";
import {WLt} from "./m3076.ts";
import {See} from "./m3068.ts";
import {xxe} from "./m3069.ts";
import {R$e} from "./m3071.ts";
var yYi=X((bjh,_Yi)=>{var WBd=mT(),OVr=require("path"),GBd=skn().copy,gYi=WLt().remove,VBd=See().mkdirp,KBd=xxe().pathExists,AYi=R$e();function zBd(e,t,n,r){if(typeof n==="function")r=n,n={};n=n||{};let o=n.overwrite||n.clobber||!1;AYi.checkPaths(e,t,"move",n,(s,i)=>{if(s)return r(s);let{srcStat:a,isChangingCase:l=!1}=i;AYi.checkParentPaths(e,a,t,"move",(c)=>{if(c)return r(c);if(YBd(t))return hYi(e,t,o,l,r);VBd(OVr.dirname(t),(u)=>{if(u)return r(u);return hYi(e,t,o,l,r)})})})}function YBd(e){let t=OVr.dirname(e);return OVr.parse(t).root===t}function hYi(e,t,n,r,o){if(r)return PVr(e,t,n,o);if(n)return gYi(t,(s)=>{if(s)return o(s);return PVr(e,t,n,o)});KBd(t,(s,i)=>{if(s)return o(s);if(i)return o(Error("dest already exists."));return PVr(e,t,n,o)})}function PVr(e,t,n,r){WBd.rename(e,t,(o)=>{if(!o)return r();if(o.code!=="EXDEV")return r(o);return JBd(e,t,n,r)})}function JBd(e,t,n,r){GBd(e,t,{overwrite:n,errorOnExist:!0},(s)=>{if(s)return r(s);return gYi(e,r)})}_Yi.exports=zBd});
export {yYi};
