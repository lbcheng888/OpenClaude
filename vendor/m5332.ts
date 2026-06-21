// @ts-nocheck
import {isAutoModeGateEnabled,getAutoModeUnavailableReason,hasAutoModeOptInAnySource,transitionPermissionMode,ly} from "../src/permissions/5185_verifyAutoModeGateAccess.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {b} from "../runtime.ts";
function jql(e){let t=e.match(/^@([\w-]+)\s+(.+)$/s);if(!t)return null;let[,n,r]=t;if(!n||!r)return null;let o=r.trim();if(!o)return null;return{recipientName:n,message:o}}
async function Wql(e,t,n,r){if(!n||!r)return{success:!1,error:"no_team_context"};if(!Object.values(n.teammates??{}).find((s)=>s.name===e))return{success:!1,error:"unknown_recipient",recipientName:e};return await r(e,{from:"user",text:t,timestamp:new Date().toISOString()},n.teamName),{success:!0,recipientName:e}}
function mJn(e){{let t=isAutoModeGateEnabled(),n=GPo(),r=!!e.isAutoModeAvailable&&t&&!n;if(!r)logForDebugging(`[auto-mode] canCycleToAuto=false: ctx.isAutoModeAvailable=${e.isAutoModeAvailable} isAutoModeGateEnabled=${t} dismissed=${n} reason=${getAutoModeUnavailableReason()}`);return r}return!1}
function GPo(){return Boolean(getGlobalConfig().autoModeOptInDismissed)&&!hasAutoModeOptInAnySource()}
function fJn(e,t){switch(e.mode){case"default":return"acceptEdits";case"acceptEdits":return"plan";case"plan":if(e.isBypassPermissionsModeAvailable)return"bypassPermissions";if(mJn(e))return"auto";return"default";case"bypassPermissions":if(mJn(e))return"auto";return"default";case"dontAsk":return"default";default:return"default"}}
function Gql(e,t,n){let r=fJn(e,t);return{nextMode:r,context:transitionPermissionMode(e.mode,r,e,n)}}
var AJn=b(()=>{Qn();qe();ly()});
export {jql,Wql,mJn,GPo,fJn,Gql,AJn};
