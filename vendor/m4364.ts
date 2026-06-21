// @ts-nocheck
import {fFe} from "../src/agent/2188_kind.ts";
import {xqn,kqn} from "../src/agent/4364_reason.ts";
import {pS,dq} from "../src/config/2722_duration_ms.ts";
import {resetGetMemoryFilesCache,zw} from "../src/config/2717_stripHtmlComments.ts";
import {clearSystemPromptSectionState,clearBetaHeaderLatches,getTotalOutputTokens,lt} from "../src/session/0131_sent.ts";
import {bqn,HL} from "../src/tools/4363_stripAllEnvVars.ts";
import {gea,Zxe} from "../src/telemetry/3181_content.ts";
import {KBa,mIe} from "../src/tui/4022_classifierApprovals.ts";
import {clearSessionMessagesCache,ja} from "../src/permissions/5143_writeRemoteAgentMetadata.ts";
import {b,ro} from "../runtime.ts";
import {b2e,S2e} from "../src/session/2690_resolveLoopFileFire.ts";
function nne(e,t,n,r){let o=fFe(e);if(xqn(n,"post_compact_cleanup",e),o){if(pS.cache.clear?.(),resetGetMemoryFilesCache("compact"),clearSystemPromptSectionState(),r===void 0)clearBetaHeaderLatches();bqn(),gea(),KBa(t?mIe(t):void 0)}if(o)V2p.resetAutonomousLoopDelivered();if(o&&t){let s=getTotalOutputTokens();t((i)=>{if(i.cacheMissAckedAtOutputTokens===s)return i;return{...i,cacheMissAckedAtOutputTokens:s}})}clearSessionMessagesCache()}
var V2p;
var Vdt=b(()=>{lt();dq();HL();zw();ja();Zxe();kqn();V2p=(b2e(),ro(S2e))});
export {nne,V2p,Vdt};
