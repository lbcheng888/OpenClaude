// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {e1t,nB} from "../src/api/2752_status.ts";
import {bae,cot,Mke,_ge} from "../src/telemetry/2750_title.ts";
import {isClaudeAISubscriber,Vv,getSubscriptionType,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {__export,Ce,Ct} from "./m197.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {cKn,sRo} from "../src/agent/4562_day.ts";
import {getTotalCostUSD,getTotalAPIDuration,getTotalDuration,getTotalLinesAdded,getTotalLinesRemoved,getModelUsage,lt} from "../src/session/0132_sent.ts";
var Ufl={};
ft(Ufl,{seedUtilization:()=>seedUtilization,loadPlanRateLimits:()=>loadPlanRateLimits,collectUsageData:()=>collectUsageData,MIN_BEHAVIOR_PCT:()=>MIN_BEHAVIOR_PCT});
function seedUtilization(){let e=e1t();if(!e.five_hour&&!e.seven_day)return null;let t=(n)=>n?{utilization:n.utilization*100,resets_at:new Date(n.resets_at*1000).toISOString()}:void 0;return{five_hour:t(e.five_hour),seven_day:t(e.seven_day)}}
async function loadPlanRateLimits(){try{let e=await bae();if(!e)return{status:"empty_response"};if(isClaudeAISubscriber()&&Vv()&&!hQp.some((n)=>(n in e))){logForDebugging("Usage fetch returned a fieldless body (in-band error envelope)",{level:"error"});let n="error"in e?e.error:void 0,r=typeof n==="object"&&n!==null&&"type"in n&&n.type==="rate_limit_error",o=seedUtilization();if(o)return{status:"seeded",utilization:o,isRateLimited:r};return{status:"unavailable",isRateLimited:r,responseBody:TeamDeleteToolName(e)}}return{status:"ok",utilization:e}}catch(e){if(__export(e))logForDebugging(`Failed to load usage data: ${Ce(e)}`,{level:"error"});else Ie(e);let t=e,n=t.response?.status===429,r=seedUtilization();if(r)return{status:"seeded",utilization:r,isRateLimited:n};return{status:"unavailable",isRateLimited:n,responseBody:t.response?.data?TeamDeleteToolName(t.response.data):void 0}}}
function Bfl(e){return{request_count:e.requestCount,session_count:e.sessionCount,behaviors:e.behaviors.filter((t)=>e.totalCost>0&&t.cost/e.totalCost*100>=MIN_BEHAVIOR_PCT).map((t)=>({key:t.key,pct:Math.round(t.cost/e.totalCost*100),count:t.count})),agents:e.agents,skills:e.skills,plugins:e.plugins,mcp_servers:e.mcpServers}}
async function collectUsageData({includeBehaviors:e=!0}={}){let t=isClaudeAISubscriber(),n=t&&Vv(),[r,o]=await Promise.all([n?loadPlanRateLimits().then((i)=>i.status==="ok"||i.status==="seeded"?i.utilization:null):Promise.resolve(null),e&&t?cKn().then((i)=>({day:Bfl(i.day),week:Bfl(i.week)}),(i)=>(Ie(i),null)):Promise.resolve(null)]),s;if(r!==null)try{s=cot(r.limits,Mke()).map((i)=>({display_name:i.title.replace(/^Current week \((.+)\)$/,"$1"),utilization:i.limit.utilization??null,resets_at:typeof i.limit.resets_at==="number"?new Date(i.limit.resets_at*1000).toISOString():i.limit.resets_at??null}))}catch(i){logForDebugging(`model_scoped projection failed: ${Ce(i)}`,{level:"error"})}return{session:{total_cost_usd:getTotalCostUSD(),total_api_duration_ms:getTotalAPIDuration(),total_duration_ms:getTotalDuration(),total_lines_added:getTotalLinesAdded(),total_lines_removed:getTotalLinesRemoved(),model_usage:getModelUsage()},subscription_type:getSubscriptionType(),rate_limits_available:n,rate_limits:r===null?null:s!==void 0&&s.length>0?{...r,model_scoped:s}:r,behaviors:o}}
var hQp,MIN_BEHAVIOR_PCT=10;
var G8t=b(()=>{lt();_ge();nB();lo();sRo();qe();Ct();vn();tn();hQp=["five_hour","seven_day","seven_day_oauth_apps","seven_day_opus","seven_day_sonnet","cinder_cove","extra_usage","limits"]});
export {Ufl,seedUtilization,loadPlanRateLimits,Bfl,collectUsageData,hQp,MIN_BEHAVIOR_PCT,G8t};
