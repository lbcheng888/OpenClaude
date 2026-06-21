// @ts-nocheck
import {isBridgeEnabled,Vk} from "../src/api/5193_isRunningInRemoteEnvironment.ts";
import {getGlobalConfig,getRemoteControlAtStartup,saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {Aae,aee} from "../src/session/2687_aee.ts";
import {bc,Ug} from "./m2264.ts";
import {b} from "../runtime.ts";
function ERo(){if(!isBridgeEnabled())return!1;let e=getGlobalConfig();return!e.hasUsedRemoteControl&&!getRemoteControlAtStartup()&&(e.remoteControlUpsellSeenCount??0)<hdm}
function yIl(){let e=(getGlobalConfig().remoteControlUpsellSeenCount??0)+1;saveGlobalConfig((t)=>(t.remoteControlUpsellSeenCount??0)>=e?t:{...t,remoteControlUpsellSeenCount:e}),Ie("tips_rc_upsell_show")}
function TIl(){return getGlobalConfig().hasUsedRemoteControl===!0||getRemoteControlAtStartup()}
function CRo(){if(!isBridgeEnabled()||!Aae())return!1;return TIl()&&bc("agentPushNotifEnabled",!1).value!==!0&&(getGlobalConfig().pushNotifUpsellSeenCount??0)<gdm}
function SIl(){return isBridgeEnabled()&&Aae()&&TIl()&&bc("agentPushNotifEnabled",!1).value!==!0}
function bIl(){let e=(getGlobalConfig().pushNotifUpsellSeenCount??0)+1;saveGlobalConfig((t)=>(t.pushNotifUpsellSeenCount??0)>=e?t:{...t,pushNotifUpsellSeenCount:e}),Ie("tips_push_upsell_show")}
function n7n(){if(getGlobalConfig().hasUsedRemoteControl)return;saveGlobalConfig((e)=>e.hasUsedRemoteControl?e:{...e,hasUsedRemoteControl:!0})}
var hdm=3,gdm=3,_Il=20;
var D8t=b(()=>{Vk();aee();Qn();Ug();ln()});
export {ERo,yIl,TIl,CRo,SIl,bIl,n7n,hdm,gdm,_Il,D8t};
