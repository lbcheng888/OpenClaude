// @ts-nocheck
import {Ws,vd} from "../src/session/1465_promise.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function Tfc(){return!Ws()}
function Sfc(e){for(let t of e)logForDebugging(`Invalid setting skipped without dialog (automated session): ${t.file??"settings"}: ${t.path}: ${t.message}`,{level:"error"})}
var bfc=b(()=>{vd();qe()});
export {Tfc,Sfc,bfc};
