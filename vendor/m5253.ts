// @ts-nocheck
import {Rno,Y3e,X3e} from "../src/api/3376_headers.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {MCP_SETTINGS_SCOPES,getMcpConfigsByScope,KA} from "../src/telemetry/3158_unwrapCcrProxyUrl.ts";
import {gTn,gxt} from "../src/api/2050_type.ts";
import {Xst,uS} from "../src/config/3192_path.ts";
import {loadAllPluginsCacheOnly,path} from "../src/agent/4467_resolvePluginRoot.ts";
import {hasStoredOAuthToken,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {b} from "../runtime.ts";
async function q6(e){if(!Rno())return;if(e.hasDynamicMcpConfig||!e.pluginStateReliable||await zDm())logForDebugging("[mcp-policy-cold-start] waiting on remote managed-settings load"),await Y3e();else logForDebugging("[mcp-policy-cold-start] skipped \u2014 no MCP server source visible")}
async function zDm(){for(let e of MCP_SETTINGS_SCOPES)if(Object.keys(getMcpConfigsByScope(e,{expandVars:!1}).servers).length>0)return!0;if(Object.keys(gTn()).length>0)return!0;if(Xst())return!0;try{if((await loadAllPluginsCacheOnly()).enabled.length>0)return!0}catch{return!0}return hasStoredOAuthToken()}
var B_t=b(()=>{lo();qe();uS();path();X3e();KA();gxt()});
export {q6,zDm,B_t};
