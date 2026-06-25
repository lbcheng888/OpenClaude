// @ts-nocheck
import {isBridgeEnabled,pH} from "../src/api/5227_isRunningInRemoteEnvironment.ts";
import {getGlobalConfig,getRemoteControlAtStartup,saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {He,mn} from "../src/telemetry/0600_feature_name.ts";
import {pae,oee} from "../src/session/2699_oee.ts";
import {lc,mg} from "./m2209.ts";
import {b} from "../runtime.ts";
function xxo(){if(!isBridgeEnabled())return!1;let e=getGlobalConfig();return!e.hasUsedRemoteControl&&!getRemoteControlAtStartup()&&(e.remoteControlUpsellSeenCount??0)<wSm}
function VNl(){let e=(getGlobalConfig().remoteControlUpsellSeenCount??0)+1;saveGlobalConfig((t)=>(t.remoteControlUpsellSeenCount??0)>=e?t:{...t,remoteControlUpsellSeenCount:e}),He("tips_rc_upsell_show")}
function KNl(){return getGlobalConfig().hasUsedRemoteControl===!0||getRemoteControlAtStartup()}
function Dxo(){if(!isBridgeEnabled()||!pae())return!1;return KNl()&&lc("agentPushNotifEnabled",!1).value!==!0&&(getGlobalConfig().pushNotifUpsellSeenCount??0)<kSm}
function zNl(){return isBridgeEnabled()&&pae()&&KNl()&&lc("agentPushNotifEnabled",!1).value!==!0}
function jNl(){let e=(getGlobalConfig().pushNotifUpsellSeenCount??0)+1;saveGlobalConfig((t)=>(t.pushNotifUpsellSeenCount??0)>=e?t:{...t,pushNotifUpsellSeenCount:e}),He("tips_push_upsell_show")}
function YYn(){if(getGlobalConfig().hasUsedRemoteControl)return;saveGlobalConfig((e)=>e.hasUsedRemoteControl?e:{...e,hasUsedRemoteControl:!0})}
var wSm=3,kSm=3,GNl=20;
var tVt=b(()=>{pH();oee();tr();mg();mn()});
export {xxo,VNl,KNl,Dxo,zNl,jNl,YYn,wSm,kSm,GNl,tVt};
