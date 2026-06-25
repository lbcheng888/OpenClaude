// @ts-nocheck
import {ZXt,p0} from "./m236.ts";
import {mi,lr} from "./m233.ts";
import {b} from "../runtime.ts";
function L3n(e,t=new Date){let n=new Date(e);if(Number.isNaN(n.getTime()))return"";let r=IDp(),o=eqa(t)-eqa(n),s=Math.round(o/86400000);if(s===0)return ZXt(r,wDp).format(n);if(s>0&&s<7)return ZXt(r,kDp).format(n);return ZXt(r,HDp).format(n)}
function IDp(){let e=process.env.LC_ALL||process.env.LC_TIME||process.env.LANG||"";if(mmo.has(e))return mmo.get(e);let t=xDp(e);return mmo.set(e,t),t}
function xDp(e){if(!e||e==="C"||e==="POSIX")return;let t=mi(mi(e,"."),"@");if(!t)return;let n=t.replaceAll("_","-");try{return new Intl.DateTimeFormat(n),n}catch{return}}
function eqa(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()}
var wDp,kDp,HDp,mmo;
var fmo=b(()=>{p0();lr();wDp={hour:"numeric",minute:"2-digit"},kDp={weekday:"long",hour:"numeric",minute:"2-digit"},HDp={weekday:"long",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"},mmo=new Map});
export {L3n,IDp,xDp,eqa,wDp,kDp,HDp,mmo,fmo};
