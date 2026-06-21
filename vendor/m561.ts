// @ts-nocheck
import {Ji,o8} from "./m461.ts";
import {b} from "../runtime.ts";
import {SMe} from "./m541.ts";
function h$c(e,t,n){if(typeof e!=="object")throw new Ji("options must be an object",Ji.ERR_BAD_OPTION_VALUE);let r=Object.keys(e),o=r.length;while(o-- >0){let s=r[o],i=Object.prototype.hasOwnProperty.call(t,s)?t[s]:void 0;if(i){let a=e[s],l=a===void 0||i(a,s,e);if(l!==!0)throw new Ji("option "+s+" must be "+l,Ji.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new Ji("Unknown option "+s,Ji.ERR_BAD_OPTION)}}
var ben,Mzo,pbt;
var Nzo=b(()=>{o8();ben={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{ben[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});Mzo={};ben.transitional=function(t,n,r){function o(s,i){return"[Axios v"+SMe+"] Transitional option '"+s+"'"+i+(r?". "+r:"")}return(s,i,a)=>{if(t===!1)throw new Ji(o(i," has been removed"+(n?" in "+n:"")),Ji.ERR_DEPRECATED);if(n&&!Mzo[i])Mzo[i]=!0,console.warn(o(i," has been deprecated since v"+n+" and will be removed in the near future"));return t?t(s,i,a):!0}};ben.spelling=function(t){return(n,r)=>(console.warn(`${r} is likely a misspelling of ${t}`),!0)};pbt={assertOptions:h$c,validators:ben}});
export {h$c,ben,Mzo,pbt,Nzo};
