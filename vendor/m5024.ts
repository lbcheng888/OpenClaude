// @ts-nocheck
import {lRn,g2i,mnt} from "./m2752.ts";
import {Ie,isTmuxControlMode,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {CUn,cct,vUn} from "../src/telemetry/3949_openInBrowser.ts";
import {setFableConsentDialogInteracted,lt} from "../src/session/0131_sent.ts";
import {kwn,YRe,eW} from "../src/telemetry/2730_raw.ts";
import {Hun,P8} from "../src/telemetry/1449_model.ts";
import {getDefaultFableModel,getFableDeclineFallbackModel,renderModelName,Mo} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {Kn,Li} from "./m2572.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {aD,bne} from "./m4590.ts";
import {o$t} from "../src/tui/3953_ExtraUsageDialog.ts";
import {pr,Yl} from "./m2562.ts";
import {H_,Zge} from "./m3951.ts";
import {c5r,unt} from "./m2750.ts";
import {ac,e_} from "./m3338.ts";
import {Jc,vE} from "./m3837.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function C8t({variant:e,onDone:t,startAtEnableConfirmForTesting:n=!1}){let[r,o]=xye.useState(n?{s:"enable-confirm"}:{s:"ack"}),s=xye.useRef(null),i=xye.useRef(null),a=xye.useRef(null),l=xye.useRef(!1);xye.useEffect(()=>{if(r.s==="verify"){let m=!1;return a.current??=lRn(),a.current.then((f)=>{if(m)return;if(f){Ie("model_fable_consent"),t("consent");return}let A=CUn();o({s:A?"enable-confirm":"enable-external"})}),()=>{m=!0}}if(r.s==="enabling"){let m=!1;return s.current??=g2i({skipLiveCheck:!0}),s.current.then((f)=>{if(m)return;if(f)Ie("model_fable_consent"),t("consent");else isTmuxControlMode("model_fable_consent","overage_enable_failed"),t("dismiss",e==="picker"?"Couldn't turn on usage credits \u2014 kept your current model. Run /usage-credits to try again.":"Couldn't turn on usage credits \u2014 run /usage-credits to try again.")}),()=>{m=!0}}if(r.s==="enable-external"){let m=!1;return i.current??=cct(),i.current.then((f)=>{if(m)return;isTmuxControlMode("model_fable_consent","overage_enable_deferred"),t("dismiss",f.type==="message"?f.value:f.opened?`Opened ${f.url} in your browser to turn on usage credits. Once enabled, run /model to switch to Fable.`:`Visit ${f.url} to turn on usage credits. Once enabled, run /model to switch to Fable.`)}),()=>{m=!0}}},[r.s,t,e]);function c(){if(setFableConsentDialogInteracted(),kwn(),YRe()){Ie("model_fable_consent"),t("consent");return}o({s:"verify"})}function u(){Oe("model_fable_consent","declined"),t("switch")}function d(){isTmuxControlMode("model_fable_consent","dismissed"),t("dismiss")}function p(){isTmuxControlMode("model_fable_consent","enable_declined"),t("dismiss",e==="picker"?"Usage credits stay off \u2014 kept your current model. Run /usage-credits to turn them on later.":"Usage credits stay off \u2014 run /usage-credits to turn them on later.")}switch(r.s){case"ack":{let m=Hun(getDefaultFableModel()),f=m?`standard API rates (${m})`:"standard API rates",A=e==="mid-session"?"Fable 5 now uses usage credits":"Continue using Fable 5 on usage credits?",h=`Fable 5 draws from usage credits instead of plan limits, billed at ${f}. Your other models remain included in your plan.`,g="Continue with Fable 5 on usage credits",_=getFableDeclineFallbackModel(),y=e==="mid-session"&&_!==null?`Switch to ${renderModelName(_)} and continue`:e==="mid-session"?"Not now":"Switch models instead";return FE.createElement(Kn,{title:A,color:"warning",onCancel:d},FE.createElement(Box,{flexDirection:"column",gap:1,marginBottom:1},FE.createElement(Text,null,h),FE.createElement(aD,{url:o$t}),FE.createElement(pr,{options:[{label:"Continue with Fable 5 on usage credits",value:"confirm"},{label:y,value:"switch"}],onChange:(T)=>T==="confirm"?c():u(),onFocus:()=>{if(!l.current){l.current=!0;return}setFableConsentDialogInteracted()},onCancel:d})))}case"enable-confirm":return FE.createElement(Kn,{title:"Turn on usage credits",color:"warning",onCancel:p},FE.createElement(Box,{flexDirection:"column",gap:1,marginBottom:1},FE.createElement(Text,null,"Usage credits aren't turned on for your account yet. Turning them on lets you keep working past your plan limits, billed at standard API rates."),FE.createElement(Text,{dimColor:!0},"Starts with a"," ",H_(c5r,"USD","whole")," ","monthly limit \xB7 run /usage-credits to adjust"),FE.createElement(Text,{dimColor:!0},"By turning on, you agree to turn on usage credits as defined in our Help Center article:",`
`,o$t),FE.createElement(ac,{confirmLabel:"Turn on",cancelLabel:"Not now",onConfirm:()=>o({s:"enabling"}),onCancel:p})));case"verify":return FE.createElement(Jc,{message:"Checking usage credits\u2026"});case"enabling":case"enable-external":return FE.createElement(Jc,{message:"Setting up usage credits\u2026"})}}
var FE,xye;
var zwo=b(()=>{lt();vUn();mnt();ze();ln();unt();Zge();eW();Mo();P8();Yl();e_();Li();bne();vE();FE=M(Te(),1),xye=M(Te(),1)});
export {C8t,FE,xye,zwo};
