// @ts-nocheck
import {ug,ZR} from "../../vendor/m2551.ts";
import {BGn,NGn,WDe,t8e} from "../permissions/4840_plan.ts";
import {mt,bo,configProtoStore} from "../../vendor/m2458.ts";
import {Zmt,MGn} from "../telemetry/4834_cloneViable.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnum} from "../../vendor/m5.ts";
import {saveGlobalConfig,getGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {Text} from "../../vendor/m2423.ts";
import {Kn,Li} from "../../vendor/m2572.ts";
import {Box} from "../../vendor/m2422.ts";
import {Link} from "../../vendor/m2427.ts";
import {pr,Yl} from "../../vendor/m2562.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function GCo(e){if(!e.bundleSeedEnabled)return null;return e.cloneViable?"This will try to clone your git remote and fall back to uploading this repository.":"This will upload your repository to Claude Code on the web."}
function zSl(e){let t=WCo.c(24),{sourcePromise:n,onChoice:r}=e;ug("ultraplan-launch");let[o]=GDe.useState(Zrm),[s]=GDe.useState(Qrm),i;if(t[0]!==s)i=BGn(s),t[0]=s,t[1]=i;else i=t[1];let a=i,l=mt(Xrm),c=bo(),u;if(t[2]!==n||t[3]!==o)u=()=>o?n??Zmt().catch(Jrm):null,t[2]=n,t[3]=o,t[4]=u;else u=t[4];let[d]=GDe.useState(u),p;if(t[5]!==r||t[6]!==s||t[7]!==l||t[8]!==c||t[9]!==o)p=function(y){let T=y==="run"&&l;if(logEvent("tengu_ultraplan_dialog_choice",{choice:fromEnum(y),first_run:o,bridge_disconnected:T,prompt_identifier:fromEnum(s)}),T)c(Yrm);if(y!=="cancel"&&o)logEvent("tengu_ultraplan_first_launch",{prompt_identifier:fromEnum(s)}),saveGlobalConfig(zrm);r(y,{disconnectedBridge:T,promptIdentifier:s})},t[5]=r,t[6]=s,t[7]=l,t[8]=c,t[9]=o,t[10]=p;else p=t[10];let m=p,f;if(t[11]!==m)f=()=>m("cancel"),t[11]=m,t[12]=f;else f=t[12];let A;if(t[13]===Symbol.for("react.memo_cache_sentinel"))A=af.createElement(Text,{dimColor:!0},"Loading\u2026"),t[13]=A;else A=t[13];let h;if(t[14]!==a||t[15]!==m||t[16]!==l||t[17]!==o||t[18]!==d)h=af.createElement(GDe.Suspense,{fallback:A},af.createElement(eom,{showTerms:o,sourcePromise:d,copy:a,replBridgeEnabled:l,onChoice:m})),t[14]=a,t[15]=m,t[16]=l,t[17]=o,t[18]=d,t[19]=h;else h=t[19];let g;if(t[20]!==a.timeEstimate||t[21]!==f||t[22]!==h)g=af.createElement(Kn,{title:"Run ultraplan in the cloud?",subtitle:a.timeEstimate,onCancel:f},h),t[20]=a.timeEstimate,t[21]=f,t[22]=h,t[23]=g;else g=t[23];return g}
function zrm(e){return e.hasSeenUltraplanTerms?e:{...e,hasSeenUltraplanTerms:!0}}
function Yrm(e){if(!e.replBridgeEnabled)return e;return{...e,replBridgeEnabled:!1,replBridgeExplicit:!1,replBridgeOutboundOnly:!1}}
function Jrm(){return null}
function Xrm(e){return e.replBridgeEnabled}
function Qrm(){return NGn()}
function Zrm(){return!getGlobalConfig().hasSeenUltraplanTerms}
function eom(e){let t=WCo.c(22),{showTerms:n,sourcePromise:r,copy:o,replBridgeEnabled:s,onChoice:i}=e,a=r?GDe.use(r):null,l;if(t[0]!==a)l=a&&GCo(a),t[0]=a,t[1]=l;else l=t[1];let c=l,u;if(t[2]!==o.dialogBody||t[3]!==o.dialogPipeline||t[4]!==s||t[5]!==n||t[6]!==c)u=n?af.createElement(af.Fragment,null,af.createElement(Text,{dimColor:!0},o.dialogBody),af.createElement(Box,{flexDirection:"column"},c&&af.createElement(Text,{dimColor:!0},c),af.createElement(Text,{dimColor:!0},"More information: ",af.createElement(Link,{url:WDe},WDe))),af.createElement(Text,null,"Proceed?")):af.createElement(af.Fragment,null,af.createElement(Box,{flexDirection:"column"},af.createElement(Text,{dimColor:!0},o.dialogBody),s&&af.createElement(Text,{dimColor:!0},"This will disable Remote Control for this session.")),!s&&af.createElement(Text,{dimColor:!0},o.dialogPipeline)),t[2]=o.dialogBody,t[3]=o.dialogPipeline,t[4]=s,t[5]=n,t[6]=c,t[7]=u;else u=t[7];let d=n?"Yes":"Run ultraplan",p=s?"Disable remote control and launch in Claude Code on the web":"launch in Claude Code on the web",m;if(t[8]!==d||t[9]!==p)m={label:d,value:"run",description:p},t[8]=d,t[9]=p,t[10]=m;else m=t[10];let f=n?"No":"Not now",A;if(t[11]!==f)A={label:f,value:"cancel"},t[11]=f,t[12]=A;else A=t[12];let h;if(t[13]!==m||t[14]!==A)h=[m,A],t[13]=m,t[14]=A,t[15]=h;else h=t[15];let g;if(t[16]!==i||t[17]!==h)g=af.createElement(pr,{options:h,onChange:i}),t[16]=i,t[17]=h,t[18]=g;else g=t[18];let _;if(t[19]!==u||t[20]!==g)_=af.createElement(Box,{flexDirection:"column",gap:1},u,g),t[19]=u,t[20]=g,t[21]=_;else _=t[21];return _}
var WCo,af,GDe;
var VCo=b(()=>{t8e();ZR();ze();Ct();configProtoStore();MGn();Qn();Yl();Li();WCo=M(rt(),1),af=M(Te(),1),GDe=M(Te(),1)});
export {GCo,zSl,zrm,Yrm,Jrm,Xrm,Qrm,Zrm,eom,WCo,af,GDe,VCo};
