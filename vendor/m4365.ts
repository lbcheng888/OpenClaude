// @ts-nocheck
import {u_,H1} from "../src/telemetry/5213_commandWithoutRedirections.ts";
import {b} from "../runtime.ts";
function J6p(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)}
function Nnl(e){if(!J6p(e))return null;let t={...e},n=[];if("timeout_ms"in t&&!("timeout"in t)){let r=t.timeout_ms;if(typeof r==="number"||typeof r==="string"&&/^\d+$/.test(r))t.timeout=r,n.push("timeout_ms");delete t.timeout_ms}return n.length?{input:t,shapeClass:n.join(",")}:null}
function Z6p(e){let t=n5p(e);if(t==="git"){let r=e5p(e);if(r==="diff"||r==="grep")return(o,s,i)=>({isError:o>=2,message:o===1?r==="grep"?"No matches found":"Files differ":void 0})}let n=Q6p.get(t);return n!==void 0?n:X6p}
function e5p(e){let r=(u_(e).at(-1)||e).trim().split(/\s+/);if(r[0]!=="git")return;for(let o=1;o<r.length;o++){let s=r[o];if(s.startsWith("-")){if(s==="-C"||s==="-c")o++;continue}return s}return}
function t5p(e){return e.trim().split(/\s+/)[0]||""}
function n5p(e){let n=u_(e).at(-1)||e;return t5p(n)}
function Fnl(e,t,n,r){let s=Z6p(e)(t,n,r);return{isError:s.isError,message:s.message}}
var X6p=(e,t,n)=>({isError:e!==0,message:e!==0?`Command failed with exit code ${e}`:void 0}),Q6p;
var Bnl=b(()=>{H1();Q6p=new Map([["grep",(e,t,n)=>({isError:e>=2,message:e===1?"No matches found":void 0})],["rg",(e,t,n)=>({isError:e>=2,message:e===1?"No matches found":void 0})],["egrep",(e,t,n)=>({isError:e>=2,message:e===1?"No matches found":void 0})],["fgrep",(e,t,n)=>({isError:e>=2,message:e===1?"No matches found":void 0})],["find",(e,t,n)=>({isError:e>=2,message:e===1?"Some directories were inaccessible":void 0})],["diff",(e,t,n)=>({isError:e>=2,message:e===1?"Files differ":void 0})],["test",(e,t,n)=>({isError:e>=2,message:e===1?"Condition is false":void 0})],["[",(e,t,n)=>({isError:e>=2,message:e===1?"Condition is false":void 0})]])});
export {J6p,Nnl,Z6p,e5p,t5p,n5p,Fnl,X6p,Q6p,Bnl};
