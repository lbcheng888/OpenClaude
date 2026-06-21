// @ts-nocheck
import {X} from "../runtime.ts";
import {mT} from "./m1464.ts";
var PJi=X((jjh,DJi)=>{var IJi=mT();function dUd(e,t,n){if(n=typeof t==="function"?t:n,t=typeof t==="function"?!1:t,t)return n(null,t);IJi.lstat(e,(r,o)=>{if(r)return n(null,"file");t=o&&o.isDirectory()?"dir":"file",n(null,t)})}function pUd(e,t){let n;if(t)return t;try{n=IJi.lstatSync(e)}catch{return"file"}return n&&n.isDirectory()?"dir":"file"}DJi.exports={symlinkType:dUd,symlinkTypeSync:pUd}});
export {PJi};
