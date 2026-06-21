// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {pS,hE,m8r,dq} from "../src/config/2722_duration_ms.ts";
import {getIsGit,Ba} from "./m693.ts";
import {bRe,T2e} from "./m2680.ts";
import {resetFileIndexCache,globalFileIndexCache,Ppt} from "../src/telemetry/4481_startBackgroundCacheRefresh.ts";
import {clearCommandsCache,Sf} from "../src/tools/5142_toSlashCommands.ts";
import {n$i,oxe} from "../src/mcp/2763_pendingChanges.ts";
import {setLastEmittedDate,clearInvokedSkills,lt} from "../src/session/0131_sent.ts";
import {nne,Vdt} from "./m4364.ts";
import {resetSentSkillNames,Bv} from "../src/agent/4429_tryGetPDFReference.ts";
import {resetGetMemoryFilesCache,zw} from "../src/config/2717_stripHtmlComments.ts";
import {d0a,jBn} from "./m3860.ts";
import {QDa,Blt} from "./m3888.ts";
import {clearRepositoryCaches,ZI} from "./m692.ts";
import {Gol,AN} from "../src/telemetry/5180_commandWithoutRedirections.ts";
import {pOa,R2t} from "./m3900.ts";
import {clearResolveGitDirCache,vO} from "./m691.ts";
import {bYa,x6} from "../src/tools/4332_displayName.ts";
import {Bra,yot} from "./m3223.ts";
import {Fuo,iqa} from "../src/api/4152_validateURL.ts";
import {uRn,C2i} from "../src/tools/2755_outputSchema.ts";
import {scrubPathsConfig,Rpt} from "../src/permissions/4454_toAgentInfos.ts";
import {SRe,B1i} from "../src/tools/2680_getSkillToolInfo.ts";
var Opt={};
isFullscreenWithTTY(Opt,{clearSessionCaches:()=>clearSessionCaches});
function clearSessionCaches(e=new Set,t){let n=e.size>0;if(pS.cache.clear?.(),hE.cache.clear?.(),m8r.cache.clear?.(),getIsGit.cache.clear?.(),bRe.cache.clear?.(),resetFileIndexCache(globalFileIndexCache),clearCommandsCache(),!n)n$i();if(setLastEmittedDate(null),nne(void 0,t),resetSentSkillNames(),resetGetMemoryFilesCache("session_start"),t?.((r)=>{if(r.storedImagePaths.size===0&&r.imageDescriptions.size===0&&Object.keys(r.displayedMessageContent).length===0)return r;return{...r,storedImagePaths:new Map,imageDescriptions:new Map,displayedMessageContent:{}}}),d0a(),!n)QDa();if(clearRepositoryCaches(),Gol(),!n)pOa();clearInvokedSkills(e),clearResolveGitDirCache(),bYa(),Bra(),Promise.resolve().then(() => (Fuo(),iqa)).then(({clearWebFetchCache:r})=>r()),Promise.resolve().then(() => (uRn(),C2i)).then(({clearToolSearchDescriptionCache:r})=>r()),Promise.resolve().then(() => (scrubPathsConfig(),Rpt)).then(({clearAgentDefinitionsCache:r})=>r()),Promise.resolve().then(() => (SRe(),B1i)).then(({clearPromptCache:r})=>r())}
var aje=b(()=>{lt();Sf();T2e();dq();Ppt();Ba();Blt();R2t();oxe();jBn();Vdt();yot();x6();Bv();AN();zw();ZI();vO()});
export {Opt,clearSessionCaches,aje};
