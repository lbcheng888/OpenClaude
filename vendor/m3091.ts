// @ts-nocheck
import {Q} from "../runtime.ts";
import {oT} from "./m1469.ts";
var Ita=Q((tZg,Hta)=>{var kta=oT();function z5d(e,t,n){if(n=typeof t==="function"?t:n,t=typeof t==="function"?!1:t,t)return n(null,t);kta.lstat(e,(r,o)=>{if(r)return n(null,"file");t=o&&o.isDirectory()?"dir":"file",n(null,t)})}function j5d(e,t){let n;if(t)return t;try{n=kta.lstatSync(e)}catch{return"file"}return n&&n.isDirectory()?"dir":"file"}Hta.exports={symlinkType:z5d,symlinkTypeSync:j5d}});
export {Ita};
