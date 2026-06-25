// @ts-nocheck
import {Hi,S5} from "./m467.ts";
import {b} from "../runtime.ts";
import {f1e} from "./m547.ts";
function CVc(e,t,n){if(typeof e!=="object")throw new Hi("options must be an object",Hi.ERR_BAD_OPTION_VALUE);let r=Object.keys(e),o=r.length;while(o-- >0){let s=r[o],i=Object.prototype.hasOwnProperty.call(t,s)?t[s]:void 0;if(i){let a=e[s],l=a===void 0||i(a,s,e);if(l!==!0)throw new Hi("option "+s+" must be "+l,Hi.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new Hi("Unknown option "+s,Hi.ERR_BAD_OPTION)}}
var rrn,Pes,FAt;
var Oes=b(()=>{S5();rrn={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{rrn[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});Pes={};rrn.transitional=function(t,n,r){function o(s,i){return"[Axios v"+f1e+"] Transitional option '"+s+"'"+i+(r?". "+r:"")}return(s,i,a)=>{if(t===!1)throw new Hi(o(i," has been removed"+(n?" in "+n:"")),Hi.ERR_DEPRECATED);if(n&&!Pes[i])Pes[i]=!0,console.warn(o(i," has been deprecated since v"+n+" and will be removed in the near future"));return t?t(s,i,a):!0}};rrn.spelling=function(t){return(n,r)=>(console.warn(`${r} is likely a misspelling of ${t}`),!0)};FAt={assertOptions:CVc,validators:rrn}});
export {CVc,rrn,Pes,FAt,Oes};
