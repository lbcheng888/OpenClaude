// @ts-nocheck
import {_i,hp} from "../src/session/1460_promise.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function Hsc(){return!_i()}
function Isc(e){for(let t of e)logForDebugging(`Invalid setting skipped without dialog (automated session): ${t.file??"settings"}: ${t.path}: ${t.message}`,{level:"error"})}
var Dsc=b(()=>{hp();qe()});
export {Hsc,Isc,Dsc};
