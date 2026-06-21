// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {mt,bo,Mc,configProtoStore} from "../../vendor/m2458.ts";
import {Ui,Ld} from "../../vendor/m2459.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Qe} from "../../vendor/m5.ts";
import {UP,m8n,byo,u8n,r6t,yyo,d8n,n6t,fJ,p8n,z_e} from "../../vendor/m4507.ts";
import {_t,cu} from "../../vendor/m582.ts";
import {jHt,WHt,Om} from "../config/2215_level.ts";
import {clearRefusalFallbackModelLatch,lt} from "../session/0131_sent.ts";
import {Ie,isTmuxControlMode,Oe,ln} from "../telemetry/0594_feature_name.ts";
import {uc,zEe,vA,dk,tE} from "../api/1448_month.ts";
import {eDe,e6t} from "../../vendor/m4505.ts";
import {isOpus1mMergeEnabled,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {C8t,zwo} from "../../vendor/m5024.ts";
import {Cft,Kwo} from "../../vendor/m5023.ts";
import {gje,b8n} from "./4526_initial.ts";
import {ec,dd,jb,Dd} from "../../vendor/m687.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {Se,bt} from "../../vendor/m195.ts";
import {w8t,GVn} from "../api/5028_type.ts";
import {KVn,R8t} from "../config/5029_isDeprecated.ts";
import {uoe,logMCPError,initKp} from "../../vendor/m609.ts";
import {Dp} from "../../vendor/m2215.ts";
import {ze} from "../../vendor/m2452.ts";
import {Cv} from "../telemetry/2217_names.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
var iHl={};
isFullscreenWithTTY(iHl,{call:()=>Aum});
function cum({hasConversationMessages:e,onDone:t}){let n=mt((_)=>_.mainLoopModel),r=mt((_)=>_.mainLoopModelForSession),o=mt((_)=>_.fastMode),s=mt((_)=>_.effortValue),i=mt((_)=>_.cacheMissAckedAtOutputTokens),a=bo(),{addNotification:l}=Ui(),[c,u]=kye.useState(null),[d,p]=kye.useState(null),m=kye.useRef(!1);function f(){logEvent("tengu_model_command_menu",{action:Qe("cancel")});let _=UP(n);t(`Kept model as ${_t.bold(_)}`,{display:"system"})}function A(_,y){if(m8n(_)){p({model:_,effort:y});return}if(byo(_,n,r,i)){u({model:_,effort:y,kind:"model"});return}if(y!==void 0&&jHt(y,s,u8n(_),i,e)){u({model:_,effort:y,kind:"effort"});return}h(_,y)}function h(_,y){if(logEvent("tengu_model_command_menu",{action:_,from_model:n,to_model:_}),y!==void 0)WHt(y);clearRefusalFallbackModelLatch(),a((R)=>({...R,mainLoopModel:_,mainLoopModelForSession:null,...y!==void 0&&{effortValue:y}}));let T=m.current;if(m.current=!1,T)r6t(_);Ie("model_switch"),sHl(_,l);let S=`Set model to ${_t.bold(UP(_))}${T?" and saved as your default for new sessions":" for this session only"}`;if(y!==void 0)S+=` with ${_t.bold(y)} effort`;let v=void 0;if(uc()){if(zEe(),!vA(_)&&o)a((R)=>({...R,fastMode:!1})),v=!1;else if(vA(_)&&dk()&&o)S+=" \xB7 Fast mode ON",v=!0}if(eDe(_,v===!0,isOpus1mMergeEnabled()))S+=" \xB7 Draws from usage credits";if(v===!1)S+=" \xB7 Fast mode OFF";if(T)S+=yyo(_);t(S)}if(d){let{model:_,effort:y}=d;return YN.createElement(C8t,{variant:"picker",onDone:(T,S)=>{if(p(null),T==="consent"){A(_,y);return}m.current=!1,t(S??`Kept model as ${_t.bold(UP(n))}`,{display:"system"})}})}if(c)return YN.createElement(Cft,{kind:c.kind,model:c.model,effort:c.effort,onConfirm:()=>h(c.model,c.effort),onCancel:()=>{u(null),m.current=!1}});return YN.createElement(gje,{initial:n,sessionModel:r,onSelect:A,onSetDefault:(_)=>{m.current=!0},onCancel:f,isStandaloneCommand:!0,skipSettingsWrite:!0,showFastModeNotice:uc()&&o&&vA(n)&&dk()})}
function uum(e){let t=oHl.c(29),{args:n,onDone:r}=e,o=Mc(),s=bo(),{addNotification:i}=Ui(),[a,l]=kye.useState(null),[c,u]=kye.useState(null),d;if(t[0]!==i||t[1]!==r||t[2]!==s||t[3]!==o)d=(g)=>{let _=!ec(),y=d8n(g,()=>o.getState(),s,_);sHl(g,i),r(y)},t[0]=i,t[1]=r,t[2]=s,t[3]=o,t[4]=d;else d=t[4];let p=d,m;if(t[5]!==p||t[6]!==o)m=(g)=>{let _=o.getState();if(byo(g,_.mainLoopModel,_.mainLoopModelForSession,_.cacheMissAckedAtOutputTokens)){l({model:g});return}p(g)},t[5]=p,t[6]=o,t[7]=m;else m=t[7];let f=m,A,h;if(t[8]!==n||t[9]!==r||t[10]!==f||t[11]!==s)A=()=>{let g=dd();if(g&&jb()){n6t(n).then((_)=>{if(!_.ok){r(_.message,{display:"system"});return}if(fJ(_.model)){isTmuxControlMode("model_fable_consent","remote_thin_client_blocked"),r("Fable 5 uses usage credits, and this cloud session can\u2019t show the consent prompt yet \xB7 switch models from the workspace, or consent once in a local session first",{display:"system"});return}let y=n==="default"?null:n;return g.sendControlRequest({subtype:"set_model",model:y??void 0}).then(()=>{s((T)=>({...T,mainLoopModel:y,mainLoopModelForSession:null})),Ie("model_switch"),r(y===null?"Reset model to the workspace default":`Set model to ${_t.bold(UP(y))}`)}).catch((T)=>{logForDebugging(`[remote] set_model rejected: ${Se(T)}`);let S=T instanceof w8t;Oe("model_switch",S?"timeout":"remote_rejected"),r(S?`No response from the cloud session \u2014 the switch to ${n} may still have been applied`:`Cloud session couldn't switch to ${n}`,{display:"system"})})});return}n6t(n).then((_)=>{if(!_.ok){r(_.message,{display:"system"});return}if(m8n(_.model)){u({model:_.model});return}f(_.model)})},h=[n,r,s,f],t[8]=n,t[9]=r,t[10]=f,t[11]=s,t[12]=A,t[13]=h;else A=t[12],h=t[13];if(kye.useEffect(A,h),c){let{model:g}=c,_;if(t[14]!==g||t[15]!==r||t[16]!==f||t[17]!==o)_=YN.createElement(C8t,{variant:"picker",onDone:(y,T)=>{if(u(null),y==="consent"){f(g);return}r(T??`Kept model as ${_t.bold(UP(o.getState().mainLoopModel))}`,{display:"system"})}}),t[14]=g,t[15]=r,t[16]=f,t[17]=o,t[18]=_;else _=t[18];return _}if(a){let g;if(t[19]!==p||t[20]!==a.model)g=()=>p(a.model),t[19]=p,t[20]=a.model,t[21]=g;else g=t[21];let _;if(t[22]!==r||t[23]!==o)_=()=>r(`Kept model as ${_t.bold(UP(o.getState().mainLoopModel))}`,{display:"system"}),t[22]=r,t[23]=o,t[24]=_;else _=t[24];let y;if(t[25]!==a.model||t[26]!==g||t[27]!==_)y=YN.createElement(Cft,{kind:"model",model:a.model,effort:void 0,onConfirm:g,onCancel:_}),t[25]=a.model,t[26]=g,t[27]=_,t[28]=y;else y=t[28];return y}return null}
function sHl(e,t){let n=KVn(e);if(!n)return;t({key:"model-deprecation-warning",kind:"warning",text:n,color:"warning",priority:"immediate",invalidates:["model-deprecation-warning"]})}
function dum(e){let{onDone:t}=e,n=mt(fum),r=mt(mum),o=mt(pum);return t(p8n({mainLoopModel:n,mainLoopModelForSession:r,effortValue:o},_t.bold)),null}
function pum(e){return e.effortValue}
function mum(e){return e.mainLoopModelForSession}
function fum(e){return e.mainLoopModel}
var oHl,YN,kye,Aum=async(e,t,n)=>{if(n=n?.trim()||"",uoe.includes(n))return logEvent("tengu_model_command_inline_help",{args:n}),YN.createElement(dum,{onDone:e});if(logMCPError.includes(n)){e("Run /model to open the model selection menu, or /model [modelName] to set the model.",{display:"system"});return}if(n)return logEvent("tengu_model_command_inline",{args_hash:Dp(n),args_length:n.length}),YN.createElement(uum,{args:n,onDone:e});if(dd()){e("Model picker shows local options in cloud sessions \u2014 pass a model name, e.g. /model sonnet",{display:"system"});return}return YN.createElement(cum,{onDone:e,hasConversationMessages:t.messages.length>0})};
var aHl=b(()=>{cu();lt();Kwo();zwo();b8n();initKp();Ld();ze();Dd();GVn();ln();Ct();configProtoStore();qe();Om();bt();Cv();e6t();tE();R8t();Mo();z_e();oHl=M(rt(),1),YN=M(Te(),1),kye=M(Te(),1)});
export {iHl,cum,uum,sHl,dum,pum,mum,fum,oHl,YN,kye,Aum,aHl};
