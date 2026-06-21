// @ts-nocheck
import {Cs,p5,Ph} from "./m2224.ts";
import {getSettings_DEPRECATED,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {xu,gf,tA} from "../src/config/2201_tA.ts";
import {_debugModuleInit,dE,GO} from "../src/telemetry/2241_GO.ts";
import {Pt,Go} from "./m632.ts";
import {getSessionId,getSdkBetas,lt} from "../src/session/0131_sent.ts";
import {getAnthropicApiKeyWithSource,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {hN,Vq} from "./m5187.ts";
import {u$,s5} from "../src/config/2182_s5.ts";
import {isPolicyAllowed,rd} from "./m2205.ts";
import {tu,B0a,_9} from "../src/config/3864_entrypoint.ts";
import {b} from "../runtime.ts";
function yYn(e){return e===Cs?p5:e}
function TYn(){let e=getSettings_DEPRECATED(),t;if(xu()){if(t={auto:gf()},_debugModuleInit())t.team=dE()}let n;return{cwd:Pt(),sessionId:getSessionId(),apiKeySource:getAnthropicApiKeyWithSource().source,betas:getSdkBetas(),outputStyle:e?.outputStyle??hN,analyticsDisabled:u$(),productFeedbackDisabled:!isPolicyAllowed("allow_product_feedback"),memoryPaths:t,messagingSocketPath:n}}
function EWt(e){let t={type:"system",subtype:"init",cwd:e.cwd,session_id:e.sessionId,tools:e.tools.map((n)=>yYn(n.name)),mcp_servers:e.mcpClients.map((n)=>({name:n.name,status:n.type})),model:e.model,permissionMode:e.permissionMode,slash_commands:e.commands.filter((n)=>n.userInvocable!==!1).map((n)=>n.name),apiKeySource:e.apiKeySource,betas:e.betas,claude_code_version:{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.185",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-20T06:38:30Z",GIT_SHA:"9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"}.VERSION,output_style:e.outputStyle,agents:e.agents.map((n)=>n.agentType),skills:e.skills.filter((n)=>n.userInvocable!==!1).map((n)=>n.name),plugins:e.plugins.map((n)=>({name:n.name,path:n.path,source:n.source})),...e.pluginErrors.length>0&&{plugin_errors:e.pluginErrors.map((n)=>({...n}))},...e.pluginWarnings.length>0&&{plugin_warnings:e.pluginWarnings.map((n)=>({...n}))},analytics_disabled:e.analyticsDisabled,product_feedback_disabled:e.productFeedbackDisabled,uuid:o9l.randomUUID()};if(e.memoryPaths)t.memory_paths={...e.memoryPaths};return t.fast_mode_state=e.fastModeState,t}
function SYn(e,t){tu("init_emit_ms",performance.now()-t,t);let n=B0a();if(n)e.startup_timing=n}
var o9l;
var CWt=b(()=>{lt();Vq();tA();GO();s5();rd();Ph();Ao();Go();yr();_9();o9l=require("crypto")});
export {yYn,TYn,EWt,SYn,o9l,CWt};
