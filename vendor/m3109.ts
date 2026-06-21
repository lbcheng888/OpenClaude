// @ts-nocheck
import {X} from "../runtime.ts";
import {EC} from "./m3064.ts";
import {mT} from "./m1464.ts";
import {Eee} from "./m3098.ts";
import {Pxe} from "./m3099.ts";
import {k$e} from "./m3101.ts";
var xJi=X(($jh,RJi)=>{var oUd=EC().fromCallback,CJi=require("path"),Lxe=mT(),vJi=Eee(),sUd=Pxe().pathExists,{areIdentical:wJi}=k$e();function iUd(e,t,n){function r(o,s){Lxe.link(o,s,(i)=>{if(i)return n(i);n(null)})}Lxe.lstat(t,(o,s)=>{Lxe.lstat(e,(i,a)=>{if(i)return i.message=i.message.replace("lstat","ensureLink"),n(i);if(s&&wJi(a,s))return n(null);let l=CJi.dirname(t);sUd(l,(c,u)=>{if(c)return n(c);if(u)return r(e,t);vJi.mkdirs(l,(d)=>{if(d)return n(d);r(e,t)})})})})}function aUd(e,t){let n;try{n=Lxe.lstatSync(t)}catch{}try{let s=Lxe.lstatSync(e);if(n&&wJi(s,n))return}catch(s){throw s.message=s.message.replace("lstat","ensureLink"),s}let r=CJi.dirname(t);if(Lxe.existsSync(r))return Lxe.linkSync(e,t);return vJi.mkdirsSync(r),Lxe.linkSync(e,t)}RJi.exports={createLink:oUd(iUd),createLinkSync:aUd}});
export {xJi};
