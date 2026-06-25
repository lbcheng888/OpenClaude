// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Gd,Pot,Yk} from "./m2796.ts";
import {R1e,Ud} from "./m615.ts";
import {getChannelAllowlist,isChannelsEnabled,wpt} from "../src/telemetry/4178_isChannelsEnabled.ts";
import {isClaudeAISubscriber,getSubscriptionType,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {getAPIProvider,Ps} from "../src/api/1287_usesFirstPartyModelIds.ts";
import {getSettingsForSource,br} from "../src/config/0745_updateSettingsForSource.ts";
import {getAllowedChannels,lt} from "../src/session/0132_sent.ts";
import {ts,oh} from "./m2600.ts";
import {Qr} from "./m323.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
var eKa={};
ft(eKa,{wrapChannelMessage:()=>wrapChannelMessage,isChannelsPolicyBlocked:()=>isChannelsPolicyBlocked,getEffectiveChannelAllowlist:()=>getEffectiveChannelAllowlist,gateChannelServer:()=>gateChannelServer,findChannelEntry:()=>findChannelEntry,ChannelPermissionNotificationSchema:()=>ChannelPermissionNotificationSchema,ChannelMessageNotificationSchema:()=>ChannelMessageNotificationSchema,CHANNEL_PERMISSION_REQUEST_METHOD:()=>CHANNEL_PERMISSION_REQUEST_METHOD,CHANNEL_PERMISSION_METHOD:()=>CHANNEL_PERMISSION_METHOD});
function wrapChannelMessage(e,t,n){let r=Object.entries(n??{}),[o,s]=sFp(r,([l])=>ZVa.test(l));if(s.length>0)logForDebugging(`[channel] ${e}: dropped ${s.length} meta key(s) that don't match ${ZVa.source}: ${s.map(([l])=>l).join(", ")}`,{level:"warn"});let i=o.map(([l,c])=>` ${l}="${Gd(c)}"`).join(""),a=Pot(R1e,t);return`<${R1e} source="${Gd(e)}"${i}>
${a}
</${R1e}>`}
function sFp(e,t){let n=[],r=[];for(let o of e)(t(o)?n:r).push(o);return[n,r]}
function getEffectiveChannelAllowlist(e){if(e)return{entries:e,source:"org"};return{entries:getChannelAllowlist(),source:"ledger"}}
function isChannelsPolicyBlocked(e){if(isClaudeAISubscriber()){let t=getSubscriptionType();return(t==="team"||t==="enterprise")&&e?.channelsEnabled!==!0}return e!==null&&e.channelsEnabled!==!0}
function findChannelEntry(e,t){let n=e.split(":");return t.find((r)=>r.kind==="server"?e===r.name:n[0]==="plugin"&&n[1]===r.name)}
function gateChannelServer(e,t,n){if(!t?.experimental?.["claude/channel"])return{action:"skip",kind:"capability",reason:"server did not declare claude/channel capability"};if(getAPIProvider()!=="firstParty")return{action:"skip",kind:"provider",reason:"channels are not available on third-party providers"};if(!isChannelsEnabled())return{action:"skip",kind:"disabled",reason:"channels feature is not currently available"};let r=getSettingsForSource("policySettings");if(isChannelsPolicyBlocked(r))return{action:"skip",kind:"policy",reason:"channels not enabled by org policy (set channelsEnabled: true in managed settings)"};let o=findChannelEntry(e,getAllowedChannels());if(!o)return{action:"skip",kind:"session",reason:`server ${e} not in --channels list for this session`};if(o.kind==="plugin"){let s=n?ts(n).marketplace:void 0;if(s!==o.marketplace)return{action:"skip",kind:"marketplace",reason:`you asked for plugin:${o.name}@${o.marketplace} but the installed ${o.name} plugin is from ${s??"an unknown source"}`};if(!o.dev){let{entries:i,source:a}=getEffectiveChannelAllowlist(r?.allowedChannelPlugins);if(!i.some((l)=>l.plugin===o.name&&l.marketplace===o.marketplace))return{action:"skip",kind:"allowlist",reason:a==="org"?`plugin ${o.name}@${o.marketplace} is not on your org's approved channels list (set allowedChannelPlugins in managed settings)`:`plugin ${o.name}@${o.marketplace} is not on the approved channels allowlist (use --dangerously-load-development-channels for local dev)`}}}else if(!o.dev)return{action:"skip",kind:"allowlist",reason:`server ${o.name} is not on the approved channels allowlist (use --dangerously-load-development-channels for local dev)`};return{action:"register"}}
var ChannelMessageNotificationSchema,CHANNEL_PERMISSION_METHOD="notifications/claude/channel/permission",ChannelPermissionNotificationSchema,CHANNEL_PERMISSION_REQUEST_METHOD="notifications/claude/channel/permission_request",ZVa;
var d5e=b(()=>{Qr();lt();Ud();lo();qe();Ps();oh();br();Yk();wpt();ChannelMessageNotificationSchema=ve(()=>C.object({method:C.literal("notifications/claude/channel"),params:C.object({content:C.string(),meta:C.record(C.string(),C.string()).optional()})})),ChannelPermissionNotificationSchema=ve(()=>C.object({method:C.literal(CHANNEL_PERMISSION_METHOD),params:C.object({request_id:C.string(),behavior:C.enum(["allow","deny"])})})),ZVa=/^[a-zA-Z_][a-zA-Z0-9_]*$/});
export {eKa,wrapChannelMessage,sFp,getEffectiveChannelAllowlist,isChannelsPolicyBlocked,findChannelEntry,gateChannelServer,ChannelMessageNotificationSchema,CHANNEL_PERMISSION_METHOD,ChannelPermissionNotificationSchema,CHANNEL_PERMISSION_REQUEST_METHOD,ZVa,d5e};
