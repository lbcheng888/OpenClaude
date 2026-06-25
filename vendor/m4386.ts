// @ts-nocheck
import {dUe} from "../src/agent/2193_kind.ts";
import {z8n,j8n} from "../src/agent/4386_reason.ts";
import {Py,y$} from "../src/config/2734_duration_ms.ts";
import {resetGetMemoryFilesCache,ZR} from "../src/config/2729_stripHtmlComments.ts";
import {clearSystemPromptSectionState,clearBetaHeaderLatches,getTotalOutputTokens,lt} from "../src/session/0132_sent.ts";
import {q8n,jO} from "../src/tools/4385_stripAllEnvVars.ts";
import {gaa,qHe} from "../src/telemetry/3195_content.ts";
import {T6a,bxe} from "../src/tui/4086_classifierApprovals.ts";
import {clearSessionMessagesCache,_a} from "../src/permissions/5175_writeRemoteAgentMetadata.ts";
import {b,oo} from "../runtime.ts";
import {k$e,w$e} from "../src/session/2702_resolveLoopFileFire.ts";
function jte(e,t,n,r){let o=dUe(e);if(z8n(n,"post_compact_cleanup",e),o){if(Py.cache.clear?.(),resetGetMemoryFilesCache("compact"),clearSystemPromptSectionState(),r===void 0)clearBetaHeaderLatches();q8n(),gaa(),T6a(t?bxe(t):void 0)}if(o)kWp.resetAutonomousLoopDelivered();if(o&&t){let s=getTotalOutputTokens();t((i)=>{if(i.cacheMissAckedAtOutputTokens===s)return i;return{...i,cacheMissAckedAtOutputTokens:s}})}clearSessionMessagesCache()}
var kWp;
var Kmt=b(()=>{lt();y$();jO();ZR();_a();qHe();j8n();kWp=(k$e(),oo(w$e))});
export {jte,kWp,Kmt};
