// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Tp,xnt,QH} from "./m2784.ts";
import {DMe,initKp} from "./m609.ts";
import {getChannelAllowlist,isChannelsEnabled,xut} from "../src/telemetry/4165_isChannelsEnabled.ts";
import {isClaudeAISubscriber,getSubscriptionType,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {getAPIProvider,li} from "../src/api/1282_usesFirstPartyModelIds.ts";
import {getSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {getAllowedChannels,lt} from "../src/session/0131_sent.ts";
import {gs,sh} from "./m2589.ts";
import {Xr} from "./m321.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
var Vqa={};
isFullscreenWithTTY(Vqa,{wrapChannelMessage:()=>wrapChannelMessage,isChannelsPolicyBlocked:()=>isChannelsPolicyBlocked,getEffectiveChannelAllowlist:()=>getEffectiveChannelAllowlist,gateChannelServer:()=>gateChannelServer,findChannelEntry:()=>findChannelEntry,ChannelPermissionNotificationSchema:()=>ChannelPermissionNotificationSchema,ChannelMessageNotificationSchema:()=>ChannelMessageNotificationSchema,CHANNEL_PERMISSION_REQUEST_METHOD:()=>CHANNEL_PERMISSION_REQUEST_METHOD,CHANNEL_PERMISSION_METHOD:()=>CHANNEL_PERMISSION_METHOD});
function wrapChannelMessage(e,t,n){let r=Object.entries(n??{}),[o,s]=qIp(r,([l])=>Gqa.test(l));if(s.length>0)logForDebugging(`[channel] ${e}: dropped ${s.length} meta key(s) that don't match ${Gqa.source}: ${s.map(([l])=>l).join(", ")}`,{level:"warn"});let i=o.map(([l,c])=>` ${l}="${Tp(c)}"`).join(""),a=xnt(DMe,t);return`<${DMe} source="${Tp(e)}"${i}>
${a}
</${DMe}>`}
function qIp(e,t){let n=[],r=[];for(let o of e)(t(o)?n:r).push(o);return[n,r]}
function getEffectiveChannelAllowlist(e){if(e)return{entries:e,source:"org"};return{entries:getChannelAllowlist(),source:"ledger"}}
function isChannelsPolicyBlocked(e){if(isClaudeAISubscriber()){let t=getSubscriptionType();return(t==="team"||t==="enterprise")&&e?.channelsEnabled!==!0}return e!==null&&e.channelsEnabled!==!0}
function findChannelEntry(e,t){let n=e.split(":");return t.find((r)=>r.kind==="server"?e===r.name:n[0]==="plugin"&&n[1]===r.name)}
function gateChannelServer(e,t,n){if(!t?.experimental?.["claude/channel"])return{action:"skip",kind:"capability",reason:"server did not declare claude/channel capability"};if(getAPIProvider()!=="firstParty")return{action:"skip",kind:"provider",reason:"channels are not available on third-party providers"};if(!isChannelsEnabled())return{action:"skip",kind:"disabled",reason:"channels feature is not currently available"};let r=getSettingsForSource("policySettings");if(isChannelsPolicyBlocked(r))return{action:"skip",kind:"policy",reason:"channels not enabled by org policy (set channelsEnabled: true in managed settings)"};let o=findChannelEntry(e,getAllowedChannels());if(!o)return{action:"skip",kind:"session",reason:`server ${e} not in --channels list for this session`};if(o.kind==="plugin"){let s=n?gs(n).marketplace:void 0;if(s!==o.marketplace)return{action:"skip",kind:"marketplace",reason:`you asked for plugin:${o.name}@${o.marketplace} but the installed ${o.name} plugin is from ${s??"an unknown source"}`};if(!o.dev){let{entries:i,source:a}=getEffectiveChannelAllowlist(r?.allowedChannelPlugins);if(!i.some((l)=>l.plugin===o.name&&l.marketplace===o.marketplace))return{action:"skip",kind:"allowlist",reason:a==="org"?`plugin ${o.name}@${o.marketplace} is not on your org's approved channels list (set allowedChannelPlugins in managed settings)`:`plugin ${o.name}@${o.marketplace} is not on the approved channels allowlist (use --dangerously-load-development-channels for local dev)`}}}else if(!o.dev)return{action:"skip",kind:"allowlist",reason:`server ${o.name} is not on the approved channels allowlist (use --dangerously-load-development-channels for local dev)`};return{action:"register"}}
var ChannelMessageNotificationSchema,CHANNEL_PERMISSION_METHOD="notifications/claude/channel/permission",ChannelPermissionNotificationSchema,CHANNEL_PERMISSION_REQUEST_METHOD="notifications/claude/channel/permission_request",Gqa;
var Gqe=b(()=>{Xr();lt();initKp();Ao();qe();li();sh();yr();QH();xut();ChannelMessageNotificationSchema=we(()=>E.object({method:E.literal("notifications/claude/channel"),params:E.object({content:E.string(),meta:E.record(E.string(),E.string()).optional()})})),ChannelPermissionNotificationSchema=we(()=>E.object({method:E.literal(CHANNEL_PERMISSION_METHOD),params:E.object({request_id:E.string(),behavior:E.enum(["allow","deny"])})})),Gqa=/^[a-zA-Z_][a-zA-Z0-9_]*$/});
export {Vqa,wrapChannelMessage,qIp,getEffectiveChannelAllowlist,isChannelsPolicyBlocked,findChannelEntry,gateChannelServer,ChannelMessageNotificationSchema,CHANNEL_PERMISSION_METHOD,ChannelPermissionNotificationSchema,CHANNEL_PERMISSION_REQUEST_METHOD,Gqa,Gqe};
