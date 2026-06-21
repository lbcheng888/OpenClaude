// @ts-nocheck
import {$D,mf} from "./m702.ts";
import {projectSettingsAliasesUserSettings,getSettingsForSource,updateSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {getGlobalConfig,DEFAULT_GLOBAL_CONFIG,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {b} from "../runtime.ts";
function bc(e,t){let n=$D(),r=n.includes("userSettings")&&projectSettingsAliasesUserSettings();for(let o=n.length-1;o>=0;o--){let s=n[o];if(s==="projectSettings"&&r)continue;let i=getSettingsForSource(s)?.[e];if(i!==void 0)return{value:i,source:s}}if($Qe.includes(e)){let o=e,s=getGlobalConfig()[o];if(s!==void 0&&s!==DEFAULT_GLOBAL_CONFIG[o])return{value:s,source:"legacyGlobalConfig"}}return{value:t,source:"default"}}
function KR(e,t){updateSettingsForSource("userSettings",{[e]:t})}
var $Qe;
var Ug=b(()=>{Qn();mf();yr();$Qe=["theme","editorMode","verbose","preferredNotifChannel","autoCompactEnabled","autoScrollEnabled","fileCheckpointingEnabled","showTurnDuration","showMessageTimestamps","terminalProgressBarEnabled","todoFeatureEnabled","teammateMode","remoteControlAtStartup","autoUploadSessions","inputNeededNotifEnabled","agentPushNotifEnabled"]});
export {bc,KR,$Qe,Ug};
