// @ts-nocheck
import {Q} from "../runtime.ts";
import {AC} from "./m3074.ts";
import {oT} from "./m1469.ts";
import {_ee} from "./m3078.ts";
import {gHe} from "./m3079.ts";
import {I9e} from "./m3081.ts";
var Rta=Q((ZQg,Ata)=>{var U5d=AC().fromCallback,bta=require("path"),yHe=oT(),Eta=_ee(),$5d=gHe().pathExists,{areIdentical:Cta}=I9e();function q5d(e,t,n){function r(o,s){yHe.link(o,s,(i)=>{if(i)return n(i);n(null)})}yHe.lstat(t,(o,s)=>{yHe.lstat(e,(i,a)=>{if(i)return i.message=i.message.replace("lstat","ensureLink"),n(i);if(s&&Cta(a,s))return n(null);let l=bta.dirname(t);$5d(l,(c,u)=>{if(c)return n(c);if(u)return r(e,t);Eta.mkdirs(l,(d)=>{if(d)return n(d);r(e,t)})})})})}function W5d(e,t){let n;try{n=yHe.lstatSync(t)}catch{}try{let s=yHe.lstatSync(e);if(n&&Cta(s,n))return}catch(s){throw s.message=s.message.replace("lstat","ensureLink"),s}let r=bta.dirname(t);if(yHe.existsSync(r))return yHe.linkSync(e,t);return Eta.mkdirsSync(r),yHe.linkSync(e,t)}Ata.exports={createLink:U5d(q5d),createLinkSync:W5d}});
export {Rta};
