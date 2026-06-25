// @ts-nocheck
import {fM,zP,FS} from "./m722.ts";
import {transitionPermissionMode,$6,cy} from "../src/permissions/5219_verifyAutoModeGateAccess.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {mo,Ct} from "./m197.ts";
import {Cwe,Pf} from "../src/agent/2591_level.ts";
import {setMainLoopModelOverride,lt} from "../src/session/0132_sent.ts";
import {pct,Iao} from "../src/api/3764_fetchBootstrapData.ts";
import {Kg,Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {CUe,Cp} from "../src/config/2223_level.ts";
import {saveGlobalConfig,checkHasTrustDialogAccepted,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {tw,mg} from "./m2209.ts";
import {clearApiKeyHelperCache,clearAwsCredentialsCache,resetAwsAuthRefreshCooldown,clearGcpCredentialsCache,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {Kq,L6e} from "../src/config/4012_ANTHROPIC_UNIX_SOCKET.ts";
import {isCronFeatureEnabled} from "../src/tui/3853_mode.ts";
import {b} from "../runtime.ts";
import {MS} from "./m460.ts";
import {jt} from "./m253.ts";
function BWl(e){return(t)=>{let n=t.toolPermissionContext;if(typeof e.permission_mode==="string"){let o=fM(e.permission_mode);try{if(n={...transitionPermissionMode(n.mode,o,n),mode:o},o==="auto")n=$6(n)}catch(s){logForDebugging(`[externalMetadataToAppState] transitionPermissionMode rejected restored mode '${o}': ${mo(s).message}`)}}let r=NPm.safeParse(e.post_turn_summary);return{...t,toolPermissionContext:n,...typeof e.is_ultraplan_mode==="boolean"&&{isUltraplanMode:e.is_ultraplan_mode},...r.success&&{postTurnSummary:r.data}}}}
function UWl(e){let t=e.session_allow_rules;if(!Array.isArray(t))return(r)=>r;let n=t.filter((r)=>typeof r==="string"&&!r.startsWith("mcp__"));if(n.length===0)return(r)=>r;return(r)=>({...r,toolPermissionContext:{...r.toolPermissionContext,alwaysAllowRules:{...r.toolPermissionContext.alwaysAllowRules,session:n}}})}
function wSe({newState:e,oldState:t},n){let r=t.toolPermissionContext.mode,o=e.toolPermissionContext.mode;if(r!==o){let a=zP(r),l=zP(o);if(a!==l){let c=l==="plan"&&e.isUltraplanMode&&!t.isUltraplanMode?!0:null;n?.notifyMetadataChanged({permission_mode:l,is_ultraplan_mode:c})}n?.notifyPermissionModeChanged(o),Cwe("--permission-mode",[],o)}if(n&&e.tasks!==t.tasks){let a=FWl(t),l=FWl(e);if(a.length!==l.length||l.some((c,u)=>c.task_id!==a[u]?.task_id))n.notifyInternalMetadataChanged({running_background_tasks:l})}let s=t.toolPermissionContext.alwaysAllowRules.session,i=e.toolPermissionContext.alwaysAllowRules.session;if(s!==i){let a=i?.filter((l)=>!l.startsWith("mcp__"));n?.notifyInternalMetadataChanged({session_allow_rules:a?.length?a:null})}if(e.mainLoopModel!==t.mainLoopModel){let a=e.mainLoopModel;setMainLoopModelOverride(a),Promise.resolve().then(() => (pct(),Iao)).then((l)=>l.fetchBootstrapData()),n?.notifyMetadataChanged({model:a??Kg()}),Cwe("--model",["-m"],a)}if(e.effortValue!==t.effortValue){n?.notifyMetadataChanged({effort_level:e.effortValue==null?null:String(e.effortValue)});let a=e.effortValue;if(a===void 0)Cwe("--effort",[],null);else if(CUe(String(a)))Cwe("--effort",[],String(a))}if(e.advisorModel!==t.advisorModel)Cwe("--advisor",[],e.advisorModel??null);if(n&&e.frameUrls!==t.frameUrls){let a=Object.values(e.frameUrls);if(a.length>0||Object.keys(t.frameUrls).length>0)n.notifyMetadataChanged({artifacts:a.length===0?null:a.map((l)=>({url:l.url,title:l.title,favicon:l.favicon,kind:"frame",updated_at:new Date(l.updatedAt).toISOString()}))})}if(n&&e.activeGoal!==t.activeGoal){let a=e.activeGoal;n.notifyMetadataChanged({goal:a?{condition:a.condition,set_at:a.setAt,iterations:a.iterations,last_reason:a.lastReason??null,met:!1}:null})}if(e.expandedView!==t.expandedView){let a=e.expandedView==="tasks";saveGlobalConfig((l)=>{if(l.showExpandedTodos===a)return l;return{...l,showExpandedTodos:a}})}if(e.verbose!==t.verbose)tw("verbose",e.verbose);if(e.settings!==t.settings)try{if(clearApiKeyHelperCache(),clearAwsCredentialsCache(),resetAwsAuthRefreshCooldown(),clearGcpCredentialsCache(),e.settings.env!==t.settings.env&&checkHasTrustDialogAccepted())Kq()}catch(a){logForDebugging(`Failed to apply settings change (clear auth caches / re-apply env): ${mo(a).message}`,{level:"error"})}}
function FWl(e){return Object.values(e.tasks).filter((t)=>isCronFeatureEnabled(t)&&(t.type==="local_bash"||t.type==="monitor_mcp")).map((t)=>({task_id:t.id,description:t.description}))}
var NPm;
var U_t=b(()=>{MS();lt();Pf();lo();tr();qe();Cp();Ct();L6e();Ro();FS();cy();mg();NPm=jt.object({status_category:jt.string(),status_detail:jt.string(),needs_action:jt.string()})});
export {BWl,UWl,wSe,FWl,NPm,U_t};
