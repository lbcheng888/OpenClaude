// @ts-nocheck
import {_i,hp} from "../session/1460_promise.ts";
import {je} from "../../vendor/m577.ts";
import {Ms,Pp} from "../config/2273_loggedTmuxCcDisable.ts";
import {tP,r5} from "../telemetry/2034_CLAUDE_AX_SCREEN_READER.ts";
import {getInitialSettings,updateSettingsForSource,yr} from "../config/0740_updateSettingsForSource.ts";
import {rGn,oGn} from "./4781_status.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {De,Rn} from "../session/0615_length.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {relaunchInto,Pvo} from "./4896_relaunchInto.ts";
import {getReplConfigArgv,lt} from "../session/0131_sent.ts";
import {pF,XS} from "../config/2341_XS.ts";
import {Box} from "../../vendor/m2422.ts";
import {Text} from "../../vendor/m2423.ts";
import {ac,e_} from "../../vendor/m3338.ts";
import {Kn,Li} from "../../vendor/m2572.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {Lr} from "../../vendor/m578.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function Ptc(){if(_i())return!1;if(je.CLAUDE_CODE_FORCE_FULLSCREEN_UPSELL)return!0;if(Ms())return!1;if(tP())return!1;if(getInitialSettings().tui!==void 0)return!1;if(!rGn())return!1;if((getGlobalConfig().fullscreenUpsellSeenCount??0)>=ZMo)return!1;return!0}
function Otc(e){let t=Dtc.c(13),{onDone:n}=e,r=FQn.useRef(!1),o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o=[],t[0]=o;else o=t[0];FQn.useEffect(T$m,o);let s;if(t[1]===Symbol.for("react.memo_cache_sentinel"))s=function(){saveGlobalConfig(y$m)},t[1]=s;else s=t[1];let i=s,a;if(t[2]!==n)a=function(){if(r.current)return;r.current=!0;let{error:h}=updateSettingsForSource("userSettings",{tui:"fullscreen"});if(h){De(h),n();return}i(),logEvent("tengu_fullscreen_upsell_dialog_accepted",{}),relaunchInto("fullscreen",getReplConfigArgv()).catch((g)=>{De(g),n()})},t[2]=n,t[3]=a;else a=t[3];let l=a,c;if(t[4]!==n)c=function(){if(r.current)return;r.current=!0,i(),logEvent("tengu_fullscreen_upsell_dialog_dismissed",{}),n()},t[4]=n,t[5]=c;else c=t[5];let u=c,d=!pF(),p;if(t[6]===Symbol.for("react.memo_cache_sentinel"))p=TEAM_LEAD_MEMBER_NAME.createElement(Box,{flexDirection:"column"},TEAM_LEAD_MEMBER_NAME.createElement(Text,{dimColor:!0},"\xB7 Flicker-free output",d?" \u2014 fixes the flashing you see during long responses":""),TEAM_LEAD_MEMBER_NAME.createElement(Text,{dimColor:!0},"\xB7 Mouse support \u2014 click to move your cursor or expand results"),TEAM_LEAD_MEMBER_NAME.createElement(Text,{dimColor:!0},"\xB7 Selected text auto-copies to your clipboard")),t[6]=p;else p=t[6];let m;if(t[7]!==l||t[8]!==u)m=TEAM_LEAD_MEMBER_NAME.createElement(Box,{flexDirection:"column",gap:1},p,TEAM_LEAD_MEMBER_NAME.createElement(ac,{confirmLabel:"Yes, try it",cancelLabel:"Not now",onConfirm:l,onCancel:u})),t[7]=l,t[8]=u,t[9]=m;else m=t[9];let f;if(t[10]!==u||t[11]!==m)f=TEAM_LEAD_MEMBER_NAME.createElement(Kn,{title:"Try the new fullscreen renderer?",onCancel:u},m),t[10]=u,t[11]=m,t[12]=f;else f=t[12];return f}
function y$m(e){return(e.fullscreenUpsellSeenCount??0)>=ZMo?e:{...e,fullscreenUpsellSeenCount:ZMo}}
function T$m(){logEvent("tengu_fullscreen_upsell_dialog_shown",{})}
var Dtc,TEAM_LEAD_MEMBER_NAME,FQn,ZMo=3;
var Ltc=b(()=>{lt();Pvo();XS();ze();Ct();hp();Qn();Lr();Pp();Rn();r5();yr();e_();Li();oGn();Dtc=M(rt(),1),TEAM_LEAD_MEMBER_NAME=M(Te(),1),FQn=M(Te(),1)});
export {Ptc,Otc,y$m,T$m,Dtc,TEAM_LEAD_MEMBER_NAME,FQn,ZMo,Ltc};
