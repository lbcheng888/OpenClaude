// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {TOt,PF} from "../src/api/2739_status.ts";
import {bae,dnt} from "./m2751.ts";
import {isClaudeAISubscriber,hasProfileScope,getSubscriptionType,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {K_,Se,bt} from "./m195.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {H8n,Yyo} from "../src/agent/4536_day.ts";
import {getTotalCostUSD,getTotalAPIDuration,getTotalDuration,getTotalLinesAdded,getTotalLinesRemoved,getModelUsage,lt} from "../src/session/0131_sent.ts";
var fal={};
isFullscreenWithTTY(fal,{seedUtilization:()=>seedUtilization,loadPlanRateLimits:()=>loadPlanRateLimits,collectUsageData:()=>collectUsageData,MIN_BEHAVIOR_PCT:()=>MIN_BEHAVIOR_PCT});
function seedUtilization(){let e=TOt();if(!e.five_hour&&!e.seven_day)return null;let t=(n)=>n?{utilization:n.utilization*100,resets_at:new Date(n.resets_at*1000).toISOString()}:void 0;return{five_hour:t(e.five_hour),seven_day:t(e.seven_day)}}
async function loadPlanRateLimits(){try{let e=await bae();if(!e)return{status:"empty_response"};if(isClaudeAISubscriber()&&hasProfileScope()&&!pWp.some((n)=>(n in e))){logForDebugging("Usage fetch returned a fieldless body (in-band error envelope)",{level:"error"});let n="error"in e?e.error:void 0,r=typeof n==="object"&&n!==null&&"type"in n&&n.type==="rate_limit_error",o=seedUtilization();if(o)return{status:"seeded",utilization:o,isRateLimited:r};return{status:"unavailable",isRateLimited:r,responseBody:Le(e)}}return{status:"ok",utilization:e}}catch(e){if(K_(e))logForDebugging(`Failed to load usage data: ${Se(e)}`,{level:"error"});else De(e);let t=e,n=t.response?.status===429,r=seedUtilization();if(r)return{status:"seeded",utilization:r,isRateLimited:n};return{status:"unavailable",isRateLimited:n,responseBody:t.response?.data?Le(t.response.data):void 0}}}
function mal(e){return{request_count:e.requestCount,session_count:e.sessionCount,behaviors:e.behaviors.filter((t)=>e.totalCost>0&&t.cost/e.totalCost*100>=MIN_BEHAVIOR_PCT).map((t)=>({key:t.key,pct:Math.round(t.cost/e.totalCost*100),count:t.count})),agents:e.agents,skills:e.skills,plugins:e.plugins,mcp_servers:e.mcpServers}}
async function collectUsageData({includeBehaviors:e=!0}={}){let t=isClaudeAISubscriber(),n=t&&hasProfileScope(),[r,o]=await Promise.all([n?loadPlanRateLimits().then((s)=>s.status==="ok"||s.status==="seeded"?s.utilization:null):Promise.resolve(null),e&&t?H8n().then((s)=>({day:mal(s.day),week:mal(s.week)}),(s)=>(De(s),null)):Promise.resolve(null)]);return{session:{total_cost_usd:getTotalCostUSD(),total_api_duration_ms:getTotalAPIDuration(),total_duration_ms:getTotalDuration(),total_lines_added:getTotalLinesAdded(),total_lines_removed:getTotalLinesRemoved(),model_usage:getModelUsage()},subscription_type:getSubscriptionType(),rate_limits_available:n,rate_limits:r,behaviors:o}}
var pWp,MIN_BEHAVIOR_PCT=10;
var g6t=b(()=>{lt();dnt();PF();Ao();Yyo();qe();bt();Rn();Xt();pWp=["five_hour","seven_day","seven_day_oauth_apps","seven_day_opus","seven_day_sonnet","cinder_cove","extra_usage"]});
export {fal,seedUtilization,loadPlanRateLimits,mal,collectUsageData,pWp,MIN_BEHAVIOR_PCT,g6t};
