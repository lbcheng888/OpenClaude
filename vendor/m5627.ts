// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Rm,tI} from "./m465.ts";
import {b} from "../runtime.ts";
import {Es,Yt} from "./m641.ts";
async function Qcc(e){if(!e||!e.trim())return logForDebugging("[binaryCheck] Empty command provided, returning false"),!1;let t=e.trim();if(!NGm.test(t))return logForDebugging(`[binaryCheck] Rejected command with unsafe characters: '${t}'`),!1;let n=Xcc.get(t);if(n!==void 0)return logForDebugging(`[binaryCheck] Cache hit for '${t}': ${n}`),n;let r=!1;if(await Rm(t).catch(()=>null))r=!0;return Xcc.set(t,r),logForDebugging(`[binaryCheck] Binary '${t}' ${r?"found":"not found"}`),r}
var Xcc,NGm;
var Zcc=b(()=>{qe();Es();tI();Xcc=new Map,NGm=Yt()==="windows"?/^[A-Za-z0-9/\\][A-Za-z0-9_.+:\\?/-]*$/:/^[A-Za-z0-9/][A-Za-z0-9_.+/-]*$/});
export {Qcc,Xcc,NGm,Zcc};
