// @ts-nocheck
import {isModelAllowed,MO} from "./m1451.ts";
import {Oe,Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {getModelUnavailabilityReason,parseUserSpecifiedModel,isOpus1mMergeEnabled,renderModelSetting,renderDefaultModelSetting,getDefaultMainLoopModelSetting,mv,Mo} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {t6t,_yo} from "./m4506.ts";
import {Aat,mNn} from "../src/api/3748_organizationType.ts";
import {Se,bt} from "./m195.ts";
import {clearRefusalFallbackModelLatch,getTotalOutputTokens,lt} from "../src/session/0131_sent.ts";
import {_t,cu} from "./m582.ts";
import {uc,zEe,vA,tE} from "../src/api/1448_month.ts";
import {eDe,e6t} from "./m4505.ts";
import {updateSettingsForSource,getEffectiveSettingSource,getSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {getRelativeSettingsFilePathForSource} from "../src/config/0735_settings.ts";
import {LO,X2} from "./m1450.ts";
import {dee,nhe,Iwn} from "./m2730.ts";
import {Hwn,eW} from "../src/telemetry/2730_raw.ts";
import {b} from "../runtime.ts";
async function n6t(e){let t=e==="default"?null:e;if(t&&!isModelAllowed(t))return Oe("model_switch","not_allowed"),{ok:!1,message:`Model '${t}' is not available. Your organization restricts model selection.`};if(t&&Tyo(t))return Oe("model_switch","opus_1m_unavailable"),{ok:!1,message:"Opus with 1M context is not available for your account. Learn more: https://code.claude.com/docs/en/model-config#extended-context-with-1m"};if(t&&Syo(t))return Oe("model_switch","sonnet_1m_unavailable"),{ok:!1,message:"Sonnet 4.6 with 1M context is not available for your account. Learn more: https://code.claude.com/docs/en/model-config#extended-context-with-1m"};if(t){let n=getModelUnavailabilityReason(t);if(n)switch(n.reason){case"disabled":return Oe("model_switch","disabled_by_org"),{ok:!1,message:`Model '${t}' is not currently available for your account${n.description?`. ${n.description}`:"."}`};case"absent":{let r=await t6t(Zsl(t)?parseUserSpecifiedModel(t):t,{forceServerProbe:!0});if(!r.valid)return Oe("model_switch",r.notFound?"fable_unavailable":"fable_probe_failed"),{ok:!1,message:r.notFound?`${n.displayName} isn't available for your account yet. Run /model to pick another model.`:r.error};return Aat(),{ok:!0,model:t}}}}if(!t||Zsl(t))return{ok:!0,model:t};try{let n=await t6t(t);if(!n.valid)return Oe("model_switch","invalid_model"),{ok:!1,message:n.error};return{ok:!0,model:t}}catch(n){return Oe("model_switch","validate_exception"),{ok:!1,message:`Failed to validate model: ${Se(n)}`}}}
function d8n(e,t,n,r){let o=t().fastMode;if(clearRefusalFallbackModelLatch(),n((a)=>({...a,mainLoopModel:e,mainLoopModelForSession:null})),r)r6t(e);Ie("model_switch");let s=`Set model to ${_t.bold(UP(e))}${r?" and saved as your default for new sessions":" for this session only"}`,i=void 0;if(uc()){if(zEe(),!vA(e)&&o)n((a)=>({...a,fastMode:!1})),i=!1;else if(vA(e)&&o)s+=" \xB7 Fast mode ON",i=!0}if(eDe(e,i===!0,isOpus1mMergeEnabled()))s+=" \xB7 Draws from usage credits";if(i===!1)s+=" \xB7 Fast mode OFF";return s+=yyo(e),s}
function r6t(e){updateSettingsForSource("userSettings",{model:e??void 0}),Ie("model_set_default")}
function yyo(e){let t=getEffectiveSettingSource("model");if(t!=="projectSettings"&&t!=="localSettings"&&t!=="policySettings")return"";let n=getSettingsForSource(t)?.model;if(n===void 0||e===n)return"";let r=t==="policySettings"?"Managed settings":getRelativeSettingsFilePathForSource(t);return _t.dim(`
     ${r} pins ${_t.bold(renderModelSetting(n))} \u2014 that applies on restart`)}
function Zsl(e){return LO(e.toLowerCase().trim())}
function Tyo(e){let t=e.toLowerCase();return!dee()&&!isOpus1mMergeEnabled()&&t.includes("opus")&&t.includes("[1m]")}
function Syo(e){let t=e.toLowerCase();return!nhe()&&(t.includes("sonnet[1m]")||t.includes("sonnet-4-6[1m]"))}
function UP(e){let t=renderDefaultModelSetting(e??getDefaultMainLoopModelSetting());return e===null?`${t} (default)`:t}
function u8n(e){return parseUserSpecifiedModel(e??getDefaultMainLoopModelSetting())}
function byo(e,t,n,r){let o=getTotalOutputTokens();if(o===0||o===r)return!1;return u8n(e)!==u8n(n??t)}
function p8n(e,t=(n)=>n){let n=UP(e.mainLoopModel),r=e.effortValue!==void 0?` (effort: ${e.effortValue})`:"";if(e.mainLoopModelForSession)return`Current model: ${t(UP(e.mainLoopModelForSession))} (session override from plan mode)
Base model: ${n}${r}`;return`Current model: ${n}${r}`}
function m8n(e){let t=e??getDefaultMainLoopModelSetting();if(!mv(parseUserSpecifiedModel(t)))return!1;return Hwn()}
function fJ(e){return e!==null&&m8n(e)}
var z_e=b(()=>{cu();lt();ln();mNn();bt();e6t();tE();X2();Iwn();eW();Mo();MO();_yo();yr()});
export {n6t,d8n,r6t,yyo,Zsl,Tyo,Syo,UP,u8n,byo,p8n,m8n,fJ,z_e};
