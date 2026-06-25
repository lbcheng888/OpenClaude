// @ts-nocheck
import {Q} from "../runtime.ts";
import {oT} from "./m1469.ts";
import {bHe} from "./m3109.ts";
var Cra=Q((xZg,Era)=>{var AHe=require("path"),wNt=oT(),WWd=bHe().pathExists;function GWd(e,t,n){if(AHe.isAbsolute(e))return wNt.lstat(e,(r)=>{if(r)return r.message=r.message.replace("lstat","ensureSymlink"),n(r);return n(null,{toCwd:e,toDst:e})});else{let r=AHe.dirname(t),o=AHe.join(r,e);return WWd(o,(s,i)=>{if(s)return n(s);if(i)return n(null,{toCwd:o,toDst:e});else return wNt.lstat(e,(a)=>{if(a)return a.message=a.message.replace("lstat","ensureSymlink"),n(a);return n(null,{toCwd:e,toDst:AHe.relative(r,e)})})})}}function VWd(e,t){let n;if(AHe.isAbsolute(e)){if(n=wNt.existsSync(e),!n)throw Error("absolute srcpath does not exist");return{toCwd:e,toDst:e}}else{let r=AHe.dirname(t),o=AHe.join(r,e);if(n=wNt.existsSync(o),n)return{toCwd:o,toDst:e};else{if(n=wNt.existsSync(e),!n)throw Error("relative srcpath does not exist");return{toCwd:e,toDst:AHe.relative(r,e)}}}}Era.exports={symlinkPaths:GWd,symlinkPathsSync:VWd}});
export {Cra};
