// @ts-nocheck
import {X} from "../runtime.ts";
import {EC} from "./m3064.ts";
import {mT} from "./m1464.ts";
import {See} from "./m3068.ts";
import {xxe} from "./m3069.ts";
import {R$e} from "./m3071.ts";
var Dzi=X((ujh,Izi)=>{var sBd=EC().fromCallback,xzi=require("path"),Hxe=mT(),kzi=See(),iBd=xxe().pathExists,{areIdentical:Hzi}=R$e();function aBd(e,t,n){function r(o,s){Hxe.link(o,s,(i)=>{if(i)return n(i);n(null)})}Hxe.lstat(t,(o,s)=>{Hxe.lstat(e,(i,a)=>{if(i)return i.message=i.message.replace("lstat","ensureLink"),n(i);if(s&&Hzi(a,s))return n(null);let l=xzi.dirname(t);iBd(l,(c,u)=>{if(c)return n(c);if(u)return r(e,t);kzi.mkdirs(l,(d)=>{if(d)return n(d);r(e,t)})})})})}function lBd(e,t){let n;try{n=Hxe.lstatSync(t)}catch{}try{let s=Hxe.lstatSync(e);if(n&&Hzi(s,n))return}catch(s){throw s.message=s.message.replace("lstat","ensureLink"),s}let r=xzi.dirname(t);if(Hxe.existsSync(r))return Hxe.linkSync(e,t);return kzi.mkdirsSync(r),Hxe.linkSync(e,t)}Izi.exports={createLink:sBd(aBd),createLinkSync:lBd}});
export {Dzi};
