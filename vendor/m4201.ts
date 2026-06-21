// @ts-nocheck
import {Pdo,Odo} from "../src/permissions/4200_ctx.ts";
import {G$t,V$t,W2a,c$n,zlo} from "../src/tui/4073_resolvedPath.ts";
import {bIe,L2n} from "./m4043.ts";
import {Rl,TU} from "../src/tui/4359_isSearch.ts";
import {Rqe,O2n} from "./m4042.ts";
import {a$n,HP,l$n} from "../src/tools/4072_theme.ts";
import {NIe,u$n} from "./m4073.ts";
import {YM,dd,Dd} from "./m687.ts";
import {withTimeout} from "../src/telemetry/1483_withTimeout.ts";
import {REMOTE_READ_MAX_BYTES,J9t} from "./m4200.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
async function jut(e){let t=e.tool,n=Pdo(t);if(n!==void 0)return{dialog:n.dialog,descriptor:n.build(e)};if(G$t(t)){let r=V$t(t,e.input);if(r!==null){let o=e.remoteWorkspace===!0,s=o&&W2a(t)&&!e.signal?.aborted?await uDp(r):void 0;return{dialog:bIe,descriptor:c$n({...e,filePath:r,remoteWorkspace:o,remoteOldContent:s})}}}if(t===Rl)return{dialog:Rqe,descriptor:a$n({...e,classifierState:"none",toolPermissionContext:e.toolPermissionContext})};return{dialog:NIe,descriptor:HP(e)}}
async function uDp(e){if(!YM("fileRead"))return;try{let t=await withTimeout(dd().sendControlRequest({subtype:"read_file",path:e,max_bytes:REMOTE_READ_MAX_BYTES}),cDp,"remote read_file timed out");if(t.truncated===!0)return;return t.contents}catch(t){let n=t instanceof Error?t.message:String(t);if(n.includes("ENOENT")||n.includes("no such file"))return null;logForDebugging(`routeTeammatePermissionDialog: remote read_file failed for ${e}: ${n}`,{level:"error"});return}}
var cDp=1e4;
var u3n=b(()=>{O2n();L2n();zlo();u$n();l$n();Odo();Dd();TU();qe();J9t()});
export {jut,uDp,cDp,u3n};
