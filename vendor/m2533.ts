// @ts-nocheck
import {ft,b} from "../runtime.ts";
var x5r={};
ft(x5r,{prewarm:()=>prewarm,isModifierPressed:()=>isModifierPressed,getModifiers:()=>getModifiers});
function NAd(e){return typeof e==="object"&&e!==null&&"getModifiers"in e&&typeof e.getModifiers==="function"&&"isModifierPressed"in e&&typeof e.isModifierPressed==="function"}
function I5r(){if(XRn)return XRn;try{let e;if(process.env.MODIFIERS_NODE_PATH)e=require(process.env.MODIFIERS_NODE_PATH);else{let t=QRn.join(QRn.dirname(KLi.fileURLToPath("file:///home/runner/work/claude-cli-internal/claude-cli-internal/vendor/modifiers-napi-src/index.ts")),"..","modifiers-napi","arm64-darwin","modifiers.node");e=VLi.createRequire("file:///home/runner/work/claude-cli-internal/claude-cli-internal/vendor/modifiers-napi-src/index.ts")(t)}if(!NAd(e))return null;return XRn=e,XRn}catch{return null}}
function getModifiers(){let e=I5r();if(!e)return[];try{return e.getModifiers()}catch{return[]}}
function isModifierPressed(e){let t=I5r();if(!t)return!1;try{return t.isModifierPressed(e)}catch{return!1}}
function prewarm(){I5r()}
var VLi,KLi,QRn,XRn=null;
var D5r=b(()=>{VLi=require("module"),KLi=require("url"),QRn=require("path")});
export {x5r,NAd,I5r,getModifiers,isModifierPressed,prewarm,VLi,KLi,QRn,XRn,D5r};
