// @ts-nocheck
import {Rgo,p6n} from "../src/permissions/4216_ctx.ts";
import {i3t,a3t,T2a,t9n,ado} from "../src/tools/3948_resolvedPath.ts";
import {B0e,R$n} from "./m3908.ts";
import {sl,UB} from "../src/tools/4381_isSearch.ts";
import {zqe,A$n} from "./m3904.ts";
import {Z$n,WD,e9n} from "../src/tools/3947_theme.ts";
import {rxe,n9n} from "./m3949.ts";
import {sM,Nu,Wu} from "./m438.ts";
import {withTimeout} from "../src/telemetry/1488_withTimeout.ts";
import {REMOTE_READ_MAX_BYTES,s7t} from "./m5298.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
async function Zer(e){let t=e.tool,n=Rgo(t);if(n!==void 0)return{dialog:n.dialog,descriptor:n.build(e)};if(i3t(t)){let r=a3t(t,e.input);if(r!==null){let o=e.remoteWorkspace===!0,s=o&&T2a(t)&&!e.signal?.aborted?await EUm(r):void 0;return{dialog:B0e,descriptor:t9n({...e,filePath:r,remoteWorkspace:o,remoteOldContent:s})}}}if(t===sl)return{dialog:zqe,descriptor:Z$n({...e,classifierState:"none",toolPermissionContext:e.toolPermissionContext})};return{dialog:rxe,descriptor:WD(e)}}
async function EUm(e){if(!sM("fileRead"))return;try{let t=await withTimeout(Nu().sendControlRequest({subtype:"read_file",path:e,max_bytes:REMOTE_READ_MAX_BYTES}),bUm,"remote read_file timed out");if(t.truncated===!0)return;return t.contents}catch(t){let n=t instanceof Error?t.message:String(t);if(n.includes("ENOENT")||n.includes("no such file"))return null;logForDebugging(`buildForwardedPermissionDialog: remote read_file failed for ${e}: ${n}`,{level:"error"});return}}
var bUm=1e4;
var ZFo=b(()=>{p6n();Wu();UB();qe();s7t();A$n();R$n();ado();n9n();e9n()});
export {Zer,EUm,bUm,ZFo};
