// @ts-nocheck
import {Q} from "../runtime.ts";
import {AC} from "./m3074.ts";
import {oT} from "./m1469.ts";
import {Tee} from "./m3108.ts";
import {bHe} from "./m3109.ts";
import {D9e} from "./m3111.ts";
var bra=Q((IZg,Sra)=>{var BWd=AC().fromCallback,_ra=require("path"),CHe=oT(),yra=Tee(),UWd=bHe().pathExists,{areIdentical:Tra}=D9e();function $Wd(e,t,n){function r(o,s){CHe.link(o,s,(i)=>{if(i)return n(i);n(null)})}CHe.lstat(t,(o,s)=>{CHe.lstat(e,(i,a)=>{if(i)return i.message=i.message.replace("lstat","ensureLink"),n(i);if(s&&Tra(a,s))return n(null);let l=_ra.dirname(t);UWd(l,(c,u)=>{if(c)return n(c);if(u)return r(e,t);yra.mkdirs(l,(d)=>{if(d)return n(d);r(e,t)})})})})}function qWd(e,t){let n;try{n=CHe.lstatSync(t)}catch{}try{let s=CHe.lstatSync(e);if(n&&Tra(s,n))return}catch(s){throw s.message=s.message.replace("lstat","ensureLink"),s}let r=_ra.dirname(t);if(CHe.existsSync(r))return CHe.linkSync(e,t);return yra.mkdirsSync(r),CHe.linkSync(e,t)}Sra.exports={createLink:BWd($Wd),createLinkSync:qWd}});
export {bra};
