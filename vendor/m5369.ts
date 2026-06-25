// @ts-nocheck
import {isAutoModeGateEnabled,getAutoModeUnavailableReason,hasAutoModeOptInAnySource,transitionPermissionMode,cy} from "../src/permissions/5219_verifyAutoModeGateAccess.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {b} from "../runtime.ts";
function Qzl(e){let t=e.match(/^@([\w-]+)\s+(.+)$/s);if(!t)return null;let[,n,r]=t;if(!n||!r)return null;let o=r.trim();if(!o)return null;return{recipientName:n,message:o}}
async function Zzl(e,t,n,r){if(!n||!r)return{success:!1,error:"no_team_context"};if(!Object.values(n.teammates??{}).find((s)=>s.name===e))return{success:!1,error:"unknown_recipient",recipientName:e};return await r(e,{from:"user",text:t,timestamp:new Date().toISOString()},n.teamName),{success:!0,recipientName:e}}
function ver(e){{let t=isAutoModeGateEnabled(),n=bFo(),r=!!e.isAutoModeAvailable&&t&&!n;if(!r)logForDebugging(`[auto-mode] canCycleToAuto=false: ctx.isAutoModeAvailable=${e.isAutoModeAvailable} isAutoModeGateEnabled=${t} dismissed=${n} reason=${getAutoModeUnavailableReason()}`);return r}return!1}
function bFo(){return Boolean(getGlobalConfig().autoModeOptInDismissed)&&!hasAutoModeOptInAnySource()}
function wer(e,t){switch(e.mode){case"default":return"acceptEdits";case"acceptEdits":return"plan";case"plan":if(e.isBypassPermissionsModeAvailable)return"bypassPermissions";if(ver(e))return"auto";return"default";case"bypassPermissions":if(ver(e))return"auto";return"default";case"dontAsk":return"default";default:return"default"}}
function ejl(e,t,n){let r=wer(e,t);return{nextMode:r,context:transitionPermissionMode(e.mode,r,e,n)}}
var ker=b(()=>{tr();qe();cy()});
export {Qzl,Zzl,ver,bFo,wer,ejl,ker};
