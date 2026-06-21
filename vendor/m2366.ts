// @ts-nocheck
import {U1,Yve} from "./m2365.ts";
import {tn,Hc} from "./m235.ts";
import {buildSystemPrompt,ope} from "./m236.ts";
import {b} from "../runtime.ts";
function lSn(e,t,n){let r=U1(e,t,n);while(tn(r)>n-t&&n>t)n--,r=U1(e,t,n);return r}
function Osd(e,t,n){if(t<1)return"";let r=tn(e);if(r<=t)return e;if(t===1)return aSn;if(n==="start")return aSn+lSn(e,r-t+1,r);if(n==="middle"){let o=Math.floor(t/2);return lSn(e,0,o)+aSn+lSn(e,r-(t-o)+1,r)}return lSn(e,0,t-1)+aSn}
function $1(e,t,n="wrap"){if(n==="wrap"||n==="wrap-stream")return buildSystemPrompt(e,t,{trim:!1,hard:!0});if(n==="wrap-trim")return buildSystemPrompt(e,t,{trim:!0,hard:!0});if(n==="end"||n==="middle"||n.startsWith("truncate")){let r="end";if(n==="truncate-middle"||n==="middle")r="middle";if(n==="truncate-start")r="start";return Osd(e,t,r)}return e}
var aSn="\u2026";
var FIt=b(()=>{Yve();Hc();ope()});
export {lSn,Osd,$1,aSn,FIt};
