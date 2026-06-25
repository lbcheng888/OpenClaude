// @ts-nocheck
import {eD,wm} from "./m707.ts";
import {projectSettingsAliasesUserSettings,getSettingsForSource,ao,br} from "../src/config/0745_updateSettingsForSource.ts";
import {getGlobalConfig,DEFAULT_GLOBAL_CONFIG,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {b} from "../runtime.ts";
function lc(e,t){let n=eD(),r=n.includes("userSettings")&&projectSettingsAliasesUserSettings();for(let o=n.length-1;o>=0;o--){let s=n[o];if(s==="projectSettings"&&r)continue;let i=getSettingsForSource(s)?.[e];if(i!==void 0)return{value:i,source:s}}if(uet.includes(e)){let o=e,s=getGlobalConfig()[o];if(s!==void 0&&s!==DEFAULT_GLOBAL_CONFIG[o])return{value:s,source:"legacyGlobalConfig"}}return{value:t,source:"default"}}
function tw(e,t){ao("userSettings",{[e]:t})}
var uet;
var mg=b(()=>{tr();wm();br();uet=["theme","editorMode","verbose","preferredNotifChannel","autoCompactEnabled","autoScrollEnabled","fileCheckpointingEnabled","showTurnDuration","showMessageTimestamps","terminalProgressBarEnabled","todoFeatureEnabled","teammateMode","remoteControlAtStartup","autoUploadSessions","inputNeededNotifEnabled","agentPushNotifEnabled"]});
export {lc,tw,uet,mg};
