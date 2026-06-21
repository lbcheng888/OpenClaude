// @ts-nocheck
import {Zg,AN} from "../src/telemetry/5180_commandWithoutRedirections.ts";
import {b} from "../runtime.ts";
function fFp(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)}
function pJa(e){if(!fFp(e))return null;let t={...e},n=[];if("timeout_ms"in t&&!("timeout"in t)){let r=t.timeout_ms;if(typeof r==="number"||typeof r==="string"&&/^\d+$/.test(r))t.timeout=r,n.push("timeout_ms");delete t.timeout_ms}return n.length?{input:t,shapeClass:n.join(",")}:null}
function gFp(e){let t=TFp(e);if(t==="git"){let r=_Fp(e);if(r==="diff"||r==="grep")return(o,s,i)=>({isError:o>=2,message:o===1?r==="grep"?"No matches found":"Files differ":void 0})}let n=hFp.get(t);return n!==void 0?n:AFp}
function _Fp(e){let r=(Zg(e).at(-1)||e).trim().split(/\s+/);if(r[0]!=="git")return;for(let o=1;o<r.length;o++){let s=r[o];if(s.startsWith("-")){if(s==="-C"||s==="-c")o++;continue}return s}return}
function yFp(e){return e.trim().split(/\s+/)[0]||""}
function TFp(e){let n=Zg(e).at(-1)||e;return yFp(n)}
function mJa(e,t,n,r){let s=gFp(e)(t,n,r);return{isError:s.isError,message:s.message}}
var AFp=(e,t,n)=>({isError:e!==0,message:e!==0?`Command failed with exit code ${e}`:void 0}),hFp;
var fJa=b(()=>{AN();hFp=new Map([["grep",(e,t,n)=>({isError:e>=2,message:e===1?"No matches found":void 0})],["rg",(e,t,n)=>({isError:e>=2,message:e===1?"No matches found":void 0})],["egrep",(e,t,n)=>({isError:e>=2,message:e===1?"No matches found":void 0})],["fgrep",(e,t,n)=>({isError:e>=2,message:e===1?"No matches found":void 0})],["find",(e,t,n)=>({isError:e>=2,message:e===1?"Some directories were inaccessible":void 0})],["diff",(e,t,n)=>({isError:e>=2,message:e===1?"Files differ":void 0})],["test",(e,t,n)=>({isError:e>=2,message:e===1?"Condition is false":void 0})],["[",(e,t,n)=>({isError:e>=2,message:e===1?"Condition is false":void 0})]])});
export {fFp,pJa,gFp,_Fp,yFp,TFp,mJa,AFp,hFp,fJa};
