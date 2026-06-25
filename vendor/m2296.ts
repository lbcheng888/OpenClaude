// @ts-nocheck
import {Ce,cn,Ct} from "./m197.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function W0(e,t){if(!("setRawMode"in e)||typeof e.setRawMode!=="function")return;try{e.setRawMode(t)}catch(n){let r=Ce(n),o=cn(n);if(r.includes("setRawMode failed")||jdd.has(o??"")){logForDebugging(`setRawMode(${t}) failed on revoked tty: ${r}`);return}throw n}}
var jdd;
var vve=b(()=>{qe();Ct();jdd=new Set(["EIO","ENOTTY","EBADF"])});
export {W0,jdd,vve};
