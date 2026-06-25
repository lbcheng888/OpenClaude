// @ts-nocheck
import {XNe,Hme,Oa,eO} from "./m1456.ts";
import {xe,He,mn} from "../src/telemetry/0600_feature_name.ts";
import {getModelUnavailabilityReason,parseUserSpecifiedModel,isOpus1mMergeEnabled,renderModelSetting,renderDefaultModelSetting,getDefaultMainLoopModelSetting,isFableFamilyOrPinnedModel,Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {L3t,t3n} from "./m4009.ts";
import {fetchBootstrapData,pct} from "../src/api/3764_fetchBootstrapData.ts";
import {Ce,Ct} from "./m197.ts";
import {clearRefusalFallbackModelLatch,getTotalOutputTokens,lt} from "../src/session/0132_sent.ts";
import {bt,Gc} from "./m588.ts";
import {$l,xAe,Hf,WS} from "../src/api/1453_month.ts";
import {JDe,w8t} from "./m4527.ts";
import {ao,getEffectiveSettingSource,getSettingsForSource,br} from "../src/config/0745_updateSettingsForSource.ts";
import {getRelativeSettingsFilePathForSource} from "../src/config/0740_settings.ts";
import {iD,T2} from "./m1455.ts";
import {cee,mge,hHn} from "./m2741.ts";
import {Tqi,zMt,ej} from "../src/telemetry/2743_raw.ts";
import {b} from "../runtime.ts";
async function k8t(e){let t=e==="default"?null:e;if(t&&XNe(t,Hme()))return xe("model_switch","denied_by_entitlement"),{ok:!1,message:`Model '${t}' is restricted by your organization's settings. Run /model to choose a different model.`};if(t&&!Oa(t))return xe("model_switch","not_allowed"),{ok:!1,message:`Model '${t}' is not available. Your organization restricts model selection.`};if(t&&pAo(t))return xe("model_switch","opus_1m_unavailable"),{ok:!1,message:"Opus with 1M context is not available for your account. Learn more: https://code.claude.com/docs/en/model-config#extended-context-with-1m"};if(t&&mAo(t))return xe("model_switch","sonnet_1m_unavailable"),{ok:!1,message:"Sonnet 4.6 with 1M context is not available for your account. Learn more: https://code.claude.com/docs/en/model-config#extended-context-with-1m"};if(t){let n=getModelUnavailabilityReason(t);if(n)switch(n.reason){case"disabled":return xe("model_switch","disabled_by_org"),{ok:!1,message:`Model '${t}' is not currently available for your account${n.description?`. ${n.description}`:"."}`};case"absent":{let r=await L3t($pl(t)?parseUserSpecifiedModel(t):t,{forceServerProbe:!0});if(!r.valid)return xe("model_switch",r.notFound?"fable_unavailable":"fable_probe_failed"),{ok:!1,message:r.notFound?`${n.displayName} isn't available for your account yet. Run /model to pick another model.`:r.error};return fetchBootstrapData(),{ok:!0,model:t}}}}if(!t||$pl(t))return{ok:!0,model:t};try{let n=await L3t(t);if(!n.valid)return xe("model_switch","invalid_model"),{ok:!1,message:n.error};return{ok:!0,model:t}}catch(n){return xe("model_switch","validate_exception"),{ok:!1,message:`Failed to validate model: ${Ce(n)}`}}}
function IVn(e,t,n,r){let o=t().fastMode;if(clearRefusalFallbackModelLatch(),n((a)=>({...a,mainLoopModel:e,mainLoopModelForSession:null})),r)H8t(e);He("model_switch");let s=`Set model to ${bt.bold(oP(e))}${r?" and saved as your default for new sessions":" for this session only"}`,i=void 0;if($l()){if(xAe(),!Hf(e)&&o)n((a)=>({...a,fastMode:!1})),i=!1;else if(Hf(e)&&o)s+=" \xB7 Fast mode ON",i=!0}if(JDe(e,i===!0,isOpus1mMergeEnabled()))s+=" \xB7 Draws from usage credits";if(i===!1)s+=" \xB7 Fast mode OFF";return s+=dAo(e),s}
function H8t(e){ao("userSettings",{model:e??void 0}),He("model_set_default")}
function dAo(e){let t=getEffectiveSettingSource("model");if(t!=="projectSettings"&&t!=="localSettings"&&t!=="policySettings")return"";let n=getSettingsForSource(t)?.model;if(n===void 0||e===n)return"";let r=t==="policySettings"?"Managed settings":getRelativeSettingsFilePathForSource(t);return bt.dim(`
     ${r} pins ${bt.bold(renderModelSetting(n))} \u2014 that applies on restart`)}
function $pl(e){return iD(e.toLowerCase().trim())}
function pAo(e){let t=e.toLowerCase();return!cee()&&!isOpus1mMergeEnabled()&&t.includes("opus")&&t.includes("[1m]")}
function mAo(e){let t=e.toLowerCase();return!mge()&&(t.includes("sonnet[1m]")||t.includes("sonnet-4-6[1m]"))}
function oP(e){let t=renderDefaultModelSetting(e??getDefaultMainLoopModelSetting());return e===null?`${t} (default)`:t}
function HVn(e){return parseUserSpecifiedModel(e??getDefaultMainLoopModelSetting())}
function fAo(e,t,n,r){let o=getTotalOutputTokens();if(o===0||o===r)return!1;return HVn(e)!==HVn(n??t)}
function xVn(e,t=(n)=>n){let n=oP(e.mainLoopModel),r=e.effortValue!==void 0?` (effort: ${e.effortValue})`:"";if(e.mainLoopModelForSession)return`Current model: ${t(oP(e.mainLoopModelForSession))} (session override from plan mode)
Base model: ${n}${r}`;return`Current model: ${n}${r}`}
function hAo(e){let t=e??getDefaultMainLoopModelSetting();if(!isFableFamilyOrPinnedModel(parseUserSpecifiedModel(t)))return!1;return Tqi()}
function ZY(e){if(e===null)return!1;return isFableFamilyOrPinnedModel(parseUserSpecifiedModel(e))&&zMt()}
var gTe=b(()=>{Gc();lt();mn();pct();Ct();w8t();WS();T2();hHn();ej();Ro();eO();t3n();br()});
export {k8t,IVn,H8t,dAo,$pl,pAo,mAo,oP,HVn,fAo,xVn,hAo,ZY,gTe};
