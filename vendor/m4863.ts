// @ts-nocheck
import {mk,lr} from "./m233.ts";
import {b} from "../runtime.ts";
function Cjn(e,t){let n=e.trim(),r=n.split(/\s+/,1)[0]??"",o=new Set,s=n;for(let i of t){let a=s.replace(new RegExp(`(?:^|\\s)--${mk(i)}(?=\\s|$)`,"g"),"");if(a!==s)o.add(i),s=a.trim()}return{rawFirstToken:r,flags:o,rest:s}}
var tIo=b(()=>{lr()});
export {Cjn,tIo};
