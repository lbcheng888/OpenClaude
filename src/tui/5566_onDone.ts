// @ts-nocheck
import {getDynamicConfig_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {getIsRemoteMode,lt} from "../session/0131_sent.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {l8n,dyo} from "./4497_onDone.ts";
import {Box} from "../../vendor/m2422.ts";
import {Text} from "../../vendor/m2423.ts";
import {Tm,Fk} from "../../vendor/m3341.ts";
import {pr,Yl} from "../../vendor/m2562.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function _Qn(){return getDynamicConfig_CACHED_MAY_BE_STALE("tengu_desktop_upsell",w2m)}
function R2m(){return!0}
function QZl(){if(getIsRemoteMode())return!1;if(!R2m())return!1;if(!_Qn().enable_startup_dialog)return!1;let e=getGlobalConfig();if(e.desktopUpsellDismissed)return!1;if((e.desktopUpsellSeenCount??0)>=3)return!1;return!0}
function ZZl(e){let t=XZl.c(14),{onDone:n}=e,[r,o]=gQn.useState(!1),s;if(t[0]===Symbol.for("react.memo_cache_sentinel"))s=[],t[0]=s;else s=t[0];if(gQn.useEffect(k2m,s),r){let A;if(t[1]!==n)A=lV.createElement(l8n,{onDone:()=>n()}),t[1]=n,t[2]=A;else A=t[2];return A}let i;if(t[3]!==n)i=function(h){switch(h){case"try":{o(!0);return}case"never":{saveGlobalConfig(x2m),n();return}case"not-now":{n();return}}},t[3]=n,t[4]=i;else i=t[4];let a=i,l;if(t[5]===Symbol.for("react.memo_cache_sentinel"))l={label:"Open in Claude Code Desktop",value:"try"},t[5]=l;else l=t[5];let c;if(t[6]===Symbol.for("react.memo_cache_sentinel"))c={label:"Not now",value:"not-now"},t[6]=c;else c=t[6];let u;if(t[7]===Symbol.for("react.memo_cache_sentinel"))u=[l,c,{label:"Don't ask again",value:"never"}],t[7]=u;else u=t[7];let d=u,p;if(t[8]===Symbol.for("react.memo_cache_sentinel"))p=lV.createElement(Box,{marginBottom:1},lV.createElement(Text,null,"Same Claude Code with visual diffs, live app preview, parallel sessions, and more.")),t[8]=p;else p=t[8];let m;if(t[9]!==a)m=()=>a("not-now"),t[9]=a,t[10]=m;else m=t[10];let f;if(t[11]!==a||t[12]!==m)f=lV.createElement(Tm,{title:"Try Claude Code Desktop"},lV.createElement(Box,{flexDirection:"column",paddingX:2,paddingY:1},p,lV.createElement(pr,{options:d,onChange:a,onCancel:m}))),t[11]=a,t[12]=m,t[13]=f;else f=t[13];return f}
function x2m(e){if(e.desktopUpsellDismissed)return e;return{...e,desktopUpsellDismissed:!0}}
function k2m(){let e=(getGlobalConfig().desktopUpsellSeenCount??0)+1;saveGlobalConfig((t)=>{if((t.desktopUpsellSeenCount??0)>=e)return t;return{...t,desktopUpsellSeenCount:e}}),logEvent("tengu_desktop_upsell_shown",{seen_count:e})}
var XZl,lV,gQn,w2m;
var BMo=b(()=>{lt();ze();zn();Ct();Qn();Yl();dyo();Fk();XZl=M(rt(),1),lV=M(Te(),1),gQn=M(Te(),1),w2m={enable_shortcut_tip:!1,enable_startup_dialog:!1,enable_contextual_tip:!1}});
export {_Qn,R2m,QZl,ZZl,x2m,k2m,XZl,lV,gQn,w2m,BMo};
