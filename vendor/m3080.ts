// @ts-nocheck
import {X} from "../runtime.ts";
import {mT} from "./m1464.ts";
import {xxe} from "./m3069.ts";
var Ozi=X((djh,Pzi)=>{var Ixe=require("path"),GLt=mT(),cBd=xxe().pathExists;function uBd(e,t,n){if(Ixe.isAbsolute(e))return GLt.lstat(e,(r)=>{if(r)return r.message=r.message.replace("lstat","ensureSymlink"),n(r);return n(null,{toCwd:e,toDst:e})});else{let r=Ixe.dirname(t),o=Ixe.join(r,e);return cBd(o,(s,i)=>{if(s)return n(s);if(i)return n(null,{toCwd:o,toDst:e});else return GLt.lstat(e,(a)=>{if(a)return a.message=a.message.replace("lstat","ensureSymlink"),n(a);return n(null,{toCwd:e,toDst:Ixe.relative(r,e)})})})}}function dBd(e,t){let n;if(Ixe.isAbsolute(e)){if(n=GLt.existsSync(e),!n)throw Error("absolute srcpath does not exist");return{toCwd:e,toDst:e}}else{let r=Ixe.dirname(t),o=Ixe.join(r,e);if(n=GLt.existsSync(o),n)return{toCwd:o,toDst:e};else{if(n=GLt.existsSync(e),!n)throw Error("relative srcpath does not exist");return{toCwd:e,toDst:Ixe.relative(r,e)}}}}Pzi.exports={symlinkPaths:uBd,symlinkPathsSync:dBd}});
export {Ozi};
