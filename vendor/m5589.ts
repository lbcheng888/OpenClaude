// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {yA,XI} from "./m459.ts";
import {b} from "../runtime.ts";
import {qs,zt} from "./m635.ts";
async function utc(e){if(!e||!e.trim())return logForDebugging("[binaryCheck] Empty command provided, returning false"),!1;let t=e.trim();if(!l$m.test(t))return logForDebugging(`[binaryCheck] Rejected command with unsafe characters: '${t}'`),!1;let n=ctc.get(t);if(n!==void 0)return logForDebugging(`[binaryCheck] Cache hit for '${t}': ${n}`),n;let r=!1;if(await yA(t).catch(()=>null))r=!0;return ctc.set(t,r),logForDebugging(`[binaryCheck] Binary '${t}' ${r?"found":"not found"}`),r}
var ctc,l$m;
var dtc=b(()=>{qe();qs();XI();ctc=new Map,l$m=zt()==="windows"?/^[A-Za-z0-9/\\][A-Za-z0-9_.+:\\?/-]*$/:/^[A-Za-z0-9/][A-Za-z0-9_.+/-]*$/});
export {utc,ctc,l$m,dtc};
