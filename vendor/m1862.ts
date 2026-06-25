// @ts-nocheck
import {Q} from "../runtime.ts";
import {r0t} from "./m1852.ts";
import {I7} from "./m1835.ts";
var Rti=Q((wWh,Ati)=>{var MKu=r0t(),NKu=I7();Ati.exports=(e,t,n)=>{let r=[],o=null,s=null,i=e.sort((u,d)=>NKu(u,d,n));for(let u of i)if(MKu(u,t,n)){if(s=u,!o)o=u}else{if(s)r.push([o,s]);s=null,o=null}if(o)r.push([o,null]);let a=[];for(let[u,d]of r)if(u===d)a.push(u);else if(!d&&u===i[0])a.push("*");else if(!d)a.push(`>=${u}`);else if(u===i[0])a.push(`<=${d}`);else a.push(`${u} - ${d}`);let l=a.join(" || "),c=typeof t.raw==="string"?t.raw:String(t);return l.length<c.length?l:t}});
export {Rti};
