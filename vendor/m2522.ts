// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
var Z9r={};
isFullscreenWithTTY(Z9r,{prewarm:()=>prewarm,isModifierPressed:()=>isModifierPressed,getModifiers:()=>getModifiers});
function dfd(e){return typeof e==="object"&&e!==null&&"getModifiers"in e&&typeof e.getModifiers==="function"&&"isModifierPressed"in e&&typeof e.isModifierPressed==="function"}
function Q9r(){if(uEn)return uEn;try{let e;if(process.env.MODIFIERS_NODE_PATH)e=require(process.env.MODIFIERS_NODE_PATH);else{let t=dEn.join(dEn.dirname(vHi.fileURLToPath("file:///home/runner/work/claude-cli-internal/claude-cli-internal/vendor/modifiers-napi-src/index.ts")),"..","modifiers-napi","arm64-darwin","modifiers.node");e=CHi.createRequire("file:///home/runner/work/claude-cli-internal/claude-cli-internal/vendor/modifiers-napi-src/index.ts")(t)}if(!dfd(e))return null;return uEn=e,uEn}catch{return null}}
function getModifiers(){let e=Q9r();if(!e)return[];try{return e.getModifiers()}catch{return[]}}
function isModifierPressed(e){let t=Q9r();if(!t)return!1;try{return t.isModifierPressed(e)}catch{return!1}}
function prewarm(){Q9r()}
var CHi,vHi,dEn,uEn=null;
var e3r=b(()=>{CHi=require("module"),vHi=require("url"),dEn=require("path")});
export {Z9r,dfd,Q9r,getModifiers,isModifierPressed,prewarm,CHi,vHi,dEn,uEn,e3r};
