// @ts-nocheck
import {TYt,KI} from "./m234.ts";
import {Di,dr} from "./m231.ts";
import {b} from "../runtime.ts";
function JUn(e,t=new Date){let n=new Date(e);if(Number.isNaN(n.getTime()))return"";let r=MEp(),o=xNa(t)-xNa(n),s=Math.round(o/86400000);if(s===0)return TYt(r,PEp).format(n);if(s>0&&s<7)return TYt(r,OEp).format(n);return TYt(r,LEp).format(n)}
function MEp(){let e=process.env.LC_ALL||process.env.LC_TIME||process.env.LANG||"";if(kao.has(e))return kao.get(e);let t=NEp(e);return kao.set(e,t),t}
function NEp(e){if(!e||e==="C"||e==="POSIX")return;let t=Di(Di(e,"."),"@");if(!t)return;let n=t.replaceAll("_","-");try{return new Intl.DateTimeFormat(n),n}catch{return}}
function xNa(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()}
var PEp,OEp,LEp,kao;
var Hao=b(()=>{KI();dr();PEp={hour:"numeric",minute:"2-digit"},OEp={weekday:"long",hour:"numeric",minute:"2-digit"},LEp={weekday:"long",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"},kao=new Map});
export {JUn,MEp,NEp,xNa,PEp,OEp,LEp,kao,Hao};
