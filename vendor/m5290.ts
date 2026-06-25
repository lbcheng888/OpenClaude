// @ts-nocheck
import {ls,w8,fg} from "./m2232.ts";
import {getSettings_DEPRECATED,br} from "../src/config/0745_updateSettingsForSource.ts";
import {Kc,xm,Jm} from "../src/config/2207_Jm.ts";
import {hI,_E,cO} from "../src/telemetry/2249_cO.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {getSessionId,getSdkBetas,lt} from "../src/session/0132_sent.ts";
import {getAnthropicApiKeyWithSource,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {I1,lq} from "./m5221.ts";
import {P2,S8} from "../src/config/2187_S8.ts";
import {isPolicyAllowed,Bu} from "./m2213.ts";
import {Mc,cFa,W$} from "../src/config/3882_entrypoint.ts";
import {b} from "../runtime.ts";
function CZn(e){return e===ls?w8:e}
function AZn(){let e=getSettings_DEPRECATED(),t;if(Kc()){if(t={auto:xm()},hI())t.team=_E()}let n;return{cwd:isTmuxControlMode(),sessionId:getSessionId(),apiKeySource:getAnthropicApiKeyWithSource().source,betas:getSdkBetas(),outputStyle:e?.outputStyle??I1,analyticsDisabled:P2(),productFeedbackDisabled:!isPolicyAllowed("allow_product_feedback"),memoryPaths:t,messagingSocketPath:n}}
function ZKt(e){let t={type:"system",subtype:"init",cwd:e.cwd,session_id:e.sessionId,tools:e.tools.map((n)=>CZn(n.name)),mcp_servers:e.mcpClients.map((n)=>({name:n.name,status:n.type})),model:e.model,permissionMode:e.permissionMode,slash_commands:e.commands.filter((n)=>n.userInvocable!==!1).map((n)=>n.name),apiKeySource:e.apiKeySource,betas:e.betas,claude_code_version:{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.190",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-24T02:21:52Z",GIT_SHA:"c1e566ee5380a4c29ddd0fd0a742361e013cebd0"}.VERSION,output_style:e.outputStyle,agents:e.agents.map((n)=>n.agentType),skills:e.skills.filter((n)=>n.userInvocable!==!1).map((n)=>n.name),plugins:e.plugins.map((n)=>({name:n.name,path:n.path,source:n.source})),...e.pluginErrors.length>0&&{plugin_errors:e.pluginErrors.map((n)=>({...n}))},...e.pluginWarnings.length>0&&{plugin_warnings:e.pluginWarnings.map((n)=>({...n}))},analytics_disabled:e.analyticsDisabled,product_feedback_disabled:e.productFeedbackDisabled,uuid:sVl.randomUUID()};if(e.memoryPaths)t.memory_paths={...e.memoryPaths};return t.fast_mode_state=e.fastModeState,t}
function RZn(e,t){Mc("init_emit_ms",performance.now()-t,t);let n=cFa();if(n)e.startup_timing=n}
var sVl;
var e7t=b(()=>{lt();lq();Jm();cO();S8();Bu();fg();lo();Po();br();W$();sVl=require("crypto")});
export {CZn,AZn,ZKt,RZn,sVl,e7t};
