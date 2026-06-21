// @ts-nocheck
import {jXr,M9e,N9e} from "../src/api/3360_headers.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {MCP_SETTINGS_SCOPES,getMcpConfigsByScope,px} from "../src/telemetry/3148_unwrapCcrProxyUrl.ts";
import {Nhn,jkt} from "../src/api/2045_type.ts";
import {AHn,ab} from "../src/config/3178_path.ts";
import {loadAllPluginsCacheOnly,gg} from "../src/agent/4445_resolvePluginRoot.ts";
import {hasStoredOAuthToken,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {b} from "../runtime.ts";
async function GJ(e){if(!jXr())return;if(e.hasDynamicMcpConfig||!e.pluginStateReliable||await OCm())logForDebugging("[mcp-policy-cold-start] waiting on remote managed-settings load"),await M9e();else logForDebugging("[mcp-policy-cold-start] skipped \u2014 no MCP server source visible")}
async function OCm(){for(let e of MCP_SETTINGS_SCOPES)if(Object.keys(getMcpConfigsByScope(e,{expandVars:!1}).servers).length>0)return!0;if(Object.keys(Nhn()).length>0)return!0;if(AHn())return!0;try{if((await loadAllPluginsCacheOnly()).enabled.length>0)return!0}catch{return!0}return hasStoredOAuthToken()}
var AWt=b(()=>{Ao();qe();ab();gg();N9e();px();jkt()});
export {GJ,OCm,AWt};
