// @ts-nocheck
import {Se,dn,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function v0(e,t){if(!("setRawMode"in e)||typeof e.setRawMode!=="function")return;try{e.setRawMode(t)}catch(n){let r=Se(n),o=dn(n);if(r.includes("setRawMode failed")||Std.has(o??"")){logForDebugging(`setRawMode(${t}) failed on revoked tty: ${r}`);return}throw n}}
var Std;
var Uve=b(()=>{qe();bt();Std=new Set(["EIO","ENOTTY","EBADF"])});
export {v0,Std,Uve};
