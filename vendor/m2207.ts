// @ts-nocheck
import {b} from "../runtime.ts";
function Rbn(e){let t=JSON.stringify([e.entrypoint??null,e.model,e.ccVersion,e.organizationUuid]),n=$Si.createHash("sha256").update(t).digest("hex");return qSi+n.slice(0,16)}
function GSi(e){return typeof e==="object"&&e!==null&&"data"in e&&"at"in e&&typeof e.at==="number"}
function VSi(e,t,n){let r=typeof e==="object"&&e!==null?Object.entries(e).filter((o)=>o[0]!==t&&o[0].startsWith(qSi)&&GSi(o[1])).sort(([,o],[,s])=>s.at-o.at).slice(0,Lad-1):[];return Object.fromEntries([[t,n],...r])}
function KSi(e,t){if(typeof e!=="object"||e===null)return null;let n=e[t];return GSi(n)?n.data??null:null}
var $Si,qSi="bi1-",Lad=12,WSi=86400000;
var _$r=b(()=>{$Si=require("crypto")});
export {Rbn,GSi,VSi,KSi,$Si,qSi,Lad,WSi,_$r};
