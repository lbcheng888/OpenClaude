// @ts-nocheck
import {Q} from "../runtime.ts";
import {oT} from "./m1469.ts";
var vra=Q((DZg,Rra)=>{var Ara=oT();function KWd(e,t,n){if(n=typeof t==="function"?t:n,t=typeof t==="function"?!1:t,t)return n(null,t);Ara.lstat(e,(r,o)=>{if(r)return n(null,"file");t=o&&o.isDirectory()?"dir":"file",n(null,t)})}function zWd(e,t){let n;if(t)return t;try{n=Ara.lstatSync(e)}catch{return"file"}return n&&n.isDirectory()?"dir":"file"}Rra.exports={symlinkType:KWd,symlinkTypeSync:zWd}});
export {vra};
