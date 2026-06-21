// @ts-nocheck
import {X} from "../runtime.ts";
import {RIt} from "./m2325.ts";
import {LK} from "./m2308.ts";
var OSi=X((Hnh,PSi)=>{var Grd=RIt(),Vrd=LK();PSi.exports=(e,t,n)=>{let r=[],o=null,s=null,i=e.sort((u,d)=>Vrd(u,d,n));for(let u of i)if(Grd(u,t,n)){if(s=u,!o)o=u}else{if(s)r.push([o,s]);s=null,o=null}if(o)r.push([o,null]);let a=[];for(let[u,d]of r)if(u===d)a.push(u);else if(!d&&u===i[0])a.push("*");else if(!d)a.push(`>=${u}`);else if(u===i[0])a.push(`<=${d}`);else a.push(`${u} - ${d}`);let l=a.join(" || "),c=typeof t.raw==="string"?t.raw:String(t);return l.length<c.length?l:t}});
export {OSi};
