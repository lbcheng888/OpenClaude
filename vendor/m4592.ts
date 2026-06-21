// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Cn,dr} from "./m231.ts";
import {b} from "../runtime.ts";
function lD(e,t){if(t<=0)return;logForDebugging(`${t} setup ${Cn(t,"issue")}: ${e} (run /doctor for details)`,{level:"info"})}
function A5n(e,t){if(e.config.type==="claudeai-proxy")return t(e.name);return e.config.type!=="sse-ide"&&e.config.type!=="ws-ide"}
function Kcl(e,t){let n=[];for(let r of e){if(r.type!=="failed"&&r.type!=="needs-auth")continue;if(A5n(r,t))n.push(r)}return n}
var EJ=b(()=>{qe();dr()});
export {lD,A5n,Kcl,EJ};
