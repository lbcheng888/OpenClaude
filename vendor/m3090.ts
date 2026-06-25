// @ts-nocheck
import {Q} from "../runtime.ts";
import {oT} from "./m1469.ts";
import {gHe} from "./m3079.ts";
var wta=Q((eZg,vta)=>{var THe=require("path"),TNt=oT(),G5d=gHe().pathExists;function V5d(e,t,n){if(THe.isAbsolute(e))return TNt.lstat(e,(r)=>{if(r)return r.message=r.message.replace("lstat","ensureSymlink"),n(r);return n(null,{toCwd:e,toDst:e})});else{let r=THe.dirname(t),o=THe.join(r,e);return G5d(o,(s,i)=>{if(s)return n(s);if(i)return n(null,{toCwd:o,toDst:e});else return TNt.lstat(e,(a)=>{if(a)return a.message=a.message.replace("lstat","ensureSymlink"),n(a);return n(null,{toCwd:e,toDst:THe.relative(r,e)})})})}}function K5d(e,t){let n;if(THe.isAbsolute(e)){if(n=TNt.existsSync(e),!n)throw Error("absolute srcpath does not exist");return{toCwd:e,toDst:e}}else{let r=THe.dirname(t),o=THe.join(r,e);if(n=TNt.existsSync(o),n)return{toCwd:o,toDst:e};else{if(n=TNt.existsSync(e),!n)throw Error("relative srcpath does not exist");return{toCwd:e,toDst:THe.relative(r,e)}}}}vta.exports={symlinkPaths:V5d,symlinkPathsSync:K5d}});
export {wta};
