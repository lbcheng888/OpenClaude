// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {Py,AE,WKr,y$} from "../src/config/2734_duration_ms.ts";
import {getIsGit,ia} from "./m698.ts";
import {ike,v$e} from "./m2691.ts";
import {resetFileIndexCache,globalFileIndexCache,Oft} from "../src/telemetry/4503_startBackgroundCacheRefresh.ts";
import {clearCommandsCache,Mm} from "../src/tools/5174_toSlashCommands.ts";
import {z5i,Gke} from "../src/mcp/2775_pendingChanges.ts";
import {setLastEmittedDate,clearInvokedSkills,lt} from "../src/session/0132_sent.ts";
import {jte,Kmt} from "./m4386.ts";
import {resetSentSkillNames,GA} from "../src/agent/4451_tryGetPDFReference.ts";
import {resetGetMemoryFilesCache,ZR} from "../src/config/2729_stripHtmlComments.ts";
import {MNa,W2n} from "./m3878.ts";
import {j7a,Vpt} from "./m4218.ts";
import {clearRepositoryCaches,_0} from "./m697.ts";
import {Ddl,H1} from "../src/telemetry/5213_commandWithoutRedirections.ts";
import {y$a,b3t} from "./m3970.ts";
import {clearResolveGitDirCache,VP} from "./m696.ts";
import {Vtl,$q} from "../src/tools/4352_displayName.ts";
import {Gua,Sit} from "./m3239.ts";
import {who,hVa} from "../src/api/4165_validateURL.ts";
import {YHn,h5i} from "../src/tools/2767_outputSchema.ts";
import {kg,wft} from "../src/permissions/4476_toAgentInfos.ts";
import {nge,C9i} from "../src/tools/2691_getSkillToolInfo.ts";
var Lft={};
ft(Lft,{clearSessionCaches:()=>clearSessionCaches});
function clearSessionCaches(e=new Set,t){let n=e.size>0;if(Py.cache.clear?.(),AE.cache.clear?.(),WKr.cache.clear?.(),getIsGit.cache.clear?.(),ike.cache.clear?.(),resetFileIndexCache(globalFileIndexCache),clearCommandsCache(),!n)z5i();if(setLastEmittedDate(null),jte(void 0,t),resetSentSkillNames(),resetGetMemoryFilesCache("session_start"),t?.((r)=>{if(r.storedImagePaths.size===0&&r.imageDescriptions.size===0&&Object.keys(r.displayedMessageContent).length===0)return r;return{...r,storedImagePaths:new Map,imageDescriptions:new Map,displayedMessageContent:{}}}),MNa(),!n)j7a();if(clearRepositoryCaches(),Ddl(),!n)y$a();clearInvokedSkills(e),clearResolveGitDirCache(),Vtl(),Gua(),Promise.resolve().then(() => (who(),hVa)).then(({clearWebFetchCache:r})=>r()),Promise.resolve().then(() => (YHn(),h5i)).then(({clearToolSearchDescriptionCache:r})=>r()),Promise.resolve().then(() => (kg(),wft)).then(({clearAgentDefinitionsCache:r})=>r()),Promise.resolve().then(() => (nge(),C9i)).then(({clearPromptCache:r})=>r())}
var O8e=b(()=>{lt();Mm();v$e();y$();Oft();ia();Vpt();b3t();Gke();W2n();Kmt();Sit();$q();GA();H1();ZR();_0();VP()});
export {Lft,clearSessionCaches,O8e};
