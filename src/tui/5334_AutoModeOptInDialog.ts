// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {updateSettingsForSource,yr} from "../config/0740_updateSettingsForSource.ts";
import {Box} from "../../vendor/m2422.ts";
import {Text} from "../../vendor/m2423.ts";
import {Link} from "../../vendor/m2427.ts";
import {pr} from "../../vendor/m2562.ts";
import {Kn,Li} from "../../vendor/m2572.ts";
import {ze} from "../../vendor/m2452.ts";
import {yb} from "../../vendor/m4521.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
var KPo={};
isFullscreenWithTTY(KPo,{AutoModeOptInDialog:()=>AutoModeOptInDialog,AUTO_MODE_DESCRIPTION:()=>AUTO_MODE_DESCRIPTION});
function AutoModeOptInDialog(e){let t=Vql.c(25),{onAccept:n,onDecline:r,declineExits:o}=e,s;if(t[0]===Symbol.for("react.memo_cache_sentinel"))s=[],t[0]=s;else s=t[0];jPe.useEffect(gHm,s);let i;if(t[1]!==n||t[2]!==r)i=function(S){if((S==="accept"||S==="accept-default")&&getGlobalConfig().autoModeOptInDismissed)saveGlobalConfig(hHm);e:switch(S){case"accept":{logEvent("tengu_auto_mode_opt_in_dialog_accept",{}),updateSettingsForSource("userSettings",{skipAutoPermissionPrompt:!0}),n();break e}case"accept-default":{logEvent("tengu_auto_mode_opt_in_dialog_accept_default",{}),updateSettingsForSource("userSettings",{skipAutoPermissionPrompt:!0,permissions:{defaultMode:"auto"}}),n();break e}case"decline":{logEvent("tengu_auto_mode_opt_in_dialog_decline",{}),r("go-back");break e}case"decline-dont-ask":{if(logEvent("tengu_auto_mode_opt_in_dialog_decline_dont_ask",{}),!getGlobalConfig().autoModeOptInDismissed)saveGlobalConfig(AHm);r("dont-ask")}}},t[1]=n,t[2]=r,t[3]=i;else i=t[3];let a=i,l;if(t[4]!==r)l=()=>r("go-back"),t[4]=r,t[5]=l;else l=t[5];let c=l,u;if(t[6]===Symbol.for("react.memo_cache_sentinel"))u=jPe.default.createElement(Box,{flexDirection:"column",gap:1},jPe.default.createElement(Text,null,AUTO_MODE_DESCRIPTION),jPe.default.createElement(Link,{url:"https://code.claude.com/docs/en/security"})),t[6]=u;else u=t[6];let d;if(t[7]===Symbol.for("react.memo_cache_sentinel"))d=[{label:"Yes, and make it my default mode",value:"accept-default"}],t[7]=d;else d=t[7];let p;if(t[8]===Symbol.for("react.memo_cache_sentinel"))p={label:"Yes, enable auto mode",value:"accept"},t[8]=p;else p=t[8];let m=o?"No, exit":"No, go back",f;if(t[9]!==m)f={label:m,value:"decline"},t[9]=m,t[10]=f;else f=t[10];let A;if(t[11]!==o)A=o?[]:[{label:"No, don't ask again",value:"decline-dont-ask"}],t[11]=o,t[12]=A;else A=t[12];let h;if(t[13]!==f||t[14]!==A)h=[...d,p,f,...A],t[13]=f,t[14]=A,t[15]=h;else h=t[15];let g;if(t[16]!==a)g=(T)=>a(T),t[16]=a,t[17]=g;else g=t[17];let _;if(t[18]!==c||t[19]!==h||t[20]!==g)_=jPe.default.createElement(pr,{options:h,onChange:g,onCancel:c}),t[18]=c,t[19]=h,t[20]=g,t[21]=_;else _=t[21];let y;if(t[22]!==c||t[23]!==_)y=jPe.default.createElement(Kn,{title:"Enable auto mode?",color:"warning",onCancel:c},u,_),t[22]=c,t[23]=_,t[24]=y;else y=t[24];return y}
function AHm(e){return{...e,autoModeOptInDismissed:!0}}
function hHm(e){return{...e,autoModeOptInDismissed:void 0}}
function gHm(){logEvent("tengu_auto_mode_opt_in_dialog_shown",{})}
var Vql,jPe,AUTO_MODE_DESCRIPTION="Auto mode lets Claude handle permission prompts automatically \u2014 Claude checks each tool call for risky actions and prompt injection before executing. Actions Claude identifies as safe are executed, while actions Claude identifies as risky are blocked and Claude may try a different approach. Ideal for long-running tasks. Sessions are slightly more expensive. Claude can make mistakes that allow harmful commands to run, it's recommended to only use in isolated environments. Shift+Tab to change mode.";
var hJn=b(()=>{Ct();ze();Qn();yr();yb();Li();Vql=M(rt(),1),jPe=M(Te(),1)});
export {KPo,AutoModeOptInDialog,AHm,hHm,gHm,Vql,jPe,AUTO_MODE_DESCRIPTION,hJn};
