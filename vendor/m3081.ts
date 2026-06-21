// @ts-nocheck
import {X} from "../runtime.ts";
import {mT} from "./m1464.ts";
var Nzi=X((pjh,Mzi)=>{var Lzi=mT();function pBd(e,t,n){if(n=typeof t==="function"?t:n,t=typeof t==="function"?!1:t,t)return n(null,t);Lzi.lstat(e,(r,o)=>{if(r)return n(null,"file");t=o&&o.isDirectory()?"dir":"file",n(null,t)})}function mBd(e,t){let n;if(t)return t;try{n=Lzi.lstatSync(e)}catch{return"file"}return n&&n.isDirectory()?"dir":"file"}Mzi.exports={symlinkType:pBd,symlinkTypeSync:mBd}});
export {Nzi};
