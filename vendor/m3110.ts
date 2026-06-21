// @ts-nocheck
import {X} from "../runtime.ts";
import {mT} from "./m1464.ts";
import {Pxe} from "./m3099.ts";
var HJi=X((qjh,kJi)=>{var Mxe=require("path"),ZLt=mT(),lUd=Pxe().pathExists;function cUd(e,t,n){if(Mxe.isAbsolute(e))return ZLt.lstat(e,(r)=>{if(r)return r.message=r.message.replace("lstat","ensureSymlink"),n(r);return n(null,{toCwd:e,toDst:e})});else{let r=Mxe.dirname(t),o=Mxe.join(r,e);return lUd(o,(s,i)=>{if(s)return n(s);if(i)return n(null,{toCwd:o,toDst:e});else return ZLt.lstat(e,(a)=>{if(a)return a.message=a.message.replace("lstat","ensureSymlink"),n(a);return n(null,{toCwd:e,toDst:Mxe.relative(r,e)})})})}}function uUd(e,t){let n;if(Mxe.isAbsolute(e)){if(n=ZLt.existsSync(e),!n)throw Error("absolute srcpath does not exist");return{toCwd:e,toDst:e}}else{let r=Mxe.dirname(t),o=Mxe.join(r,e);if(n=ZLt.existsSync(o),n)return{toCwd:o,toDst:e};else{if(n=ZLt.existsSync(e),!n)throw Error("relative srcpath does not exist");return{toCwd:e,toDst:Mxe.relative(r,e)}}}}kJi.exports={symlinkPaths:cUd,symlinkPathsSync:uUd}});
export {HJi};
