// @ts-nocheck
import {Q} from "../runtime.ts";
import {tPt} from "./m2335.ts";
import {uz} from "./m2318.ts";
var qwi=Q((uhg,$wi)=>{var yfd=tPt(),Tfd=uz();$wi.exports=(e,t,n)=>{let r=[],o=null,s=null,i=e.sort((u,d)=>Tfd(u,d,n));for(let u of i)if(yfd(u,t,n)){if(s=u,!o)o=u}else{if(s)r.push([o,s]);s=null,o=null}if(o)r.push([o,null]);let a=[];for(let[u,d]of r)if(u===d)a.push(u);else if(!d&&u===i[0])a.push("*");else if(!d)a.push(`>=${u}`);else if(u===i[0])a.push(`<=${d}`);else a.push(`${u} - ${d}`);let l=a.join(" || "),c=typeof t.raw==="string"?t.raw:String(t);return l.length<c.length?l:t}});
export {qwi};
