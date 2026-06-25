// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Sn,lr} from "./m233.ts";
import {b} from "../runtime.ts";
function bx(e,t){if(t<=0)return;logForDebugging(`${t} setup ${Sn(t,"issue")}: ${e} (run /doctor for details)`,{level:"info"})}
function JKn(e,t){if(e.config.type==="claudeai-proxy")return t(e.name);return e.config.type!=="sse-ide"&&e.config.type!=="ws-ide"}
function k_l(e,t){let n=[];for(let r of e){if(r.type!=="failed"&&r.type!=="needs-auth")continue;if(JKn(r,t))n.push(r)}return n}
var lJ=b(()=>{qe();lr()});
export {bx,JKn,k_l,lJ};
