// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {zDe,c8t} from "../config/4894_cmd.ts";
import {eve,tP,r5} from "../telemetry/2034_CLAUDE_AX_SCREEN_READER.ts";
import {mr,ki} from "../../vendor/m2453.ts";
import {Kc,tv} from "../../vendor/m232.ts";
import {logEventTo1PAwaitable,is1PEventLoggingEnabled,I1} from "../session/2197_shutdown1PEventLogging.ts";
import {fromEnum} from "../../vendor/m5.ts";
import {_Z,Ms,Ove,Pp} from "../config/2273_loggedTmuxCcDisable.ts";
import {getGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {De,Rn} from "../session/0615_length.ts";
import {sleep} from "../telemetry/1483_withTimeout.ts";
import {gF} from "../../vendor/m2379.ts";
import {Or,Ts} from "../../vendor/m2542.ts";
import {Box} from "../../vendor/m2422.ts";
import {Text} from "../../vendor/m2423.ts";
import {Tn,zs} from "../../vendor/m2554.ts";
import {at,rs} from "../../vendor/m2546.ts";
import {lr,readRoster} from "../../vendor/m2547.ts";
import {Kn,Li} from "../../vendor/m2572.ts";
import {Pa,rh} from "../../vendor/m2539.ts";
import {uVn,Ivo} from "../../vendor/m4894.ts";
import {Fr,Fh,Ql} from "../../vendor/m4405.ts";
import {_i,hp} from "../session/1460_promise.ts";
import {getInitialSettings,updateSettingsForSource,yr} from "../config/0740_updateSettingsForSource.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {B1,Gve} from "../config/2342_useDecayCurve.ts";
import {isPolicyAllowed,rd} from "../../vendor/m2205.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
var xCl={};
isFullscreenWithTTY(xCl,{relaunchInto:()=>relaunchInto,call:()=>zsm});
function relaunchInto(e,t){return zDe({freshIfNoTranscript:!0,extraArgs:t,env:{CLAUDE_CODE_TUI_JUST_SWITCHED:e,...eve()},dropEnv:["CLAUDE_CODE_NO_FLICKER","CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN","CLAUDE_CODE_FORCE_FULLSCREEN_UPSELL"]})}
function Jsm(e){return e.toLowerCase().replace(/[^a-z]/g,"")===Ysm}
function Qsm(e){let t=RCl.c(20),{fromEntryPath:n,bounce:r,revertKind:o,carryFlags:s,onDone:i}=e,[a,l]=AD.useState(""),[c,u]=AD.useState(0),[d,p]=AD.useState(null),{columns:m}=mr(),f=AD.useRef(!1),A;if(t[0]===Symbol.for("react.memo_cache_sentinel"))A=(I)=>{if(f.current)return;f.current=!0,p(I.trim())},t[0]=A;else A=t[0];let h=A,g,_;if(t[1]!==r||t[2]!==s||t[3]!==n||t[4]!==i||t[5]!==o||t[6]!==d)g=()=>{if(d===null)return;let I=!1;return(async()=>{if(d&&!Jsm(d)){let P=Kc(d).slice(0,Xsm);await logEventTo1PAwaitable("tengu_tui_optout_reason",{reason:P,from_entry_path:fromEnum(n),bounce:r,downsell_gate:_Z.downsellGateCached===!0,revert_kind:fromEnum(o),downsell_seen_count:getGlobalConfig().fullscreenDownsellSeenCount??0}).catch(De)}if(await sleep(gF*2),I)return;relaunchInto("default",s).catch((P)=>{De(P),i(`Couldn't switch renderers \u2014 ${P instanceof Error?P.message:String(P)}. The setting was saved; restart Claude Code to apply it.`,{display:"system"})})})(),()=>{I=!0}},_=[d,n,r,o,s,i],t[1]=r,t[2]=s,t[3]=n,t[4]=i,t[5]=o,t[6]=d,t[7]=g,t[8]=_;else g=t[7],_=t[8];AD.useEffect(g,_);let y,T;if(t[9]===Symbol.for("react.memo_cache_sentinel"))y=()=>h(""),T={context:"Settings"},t[9]=y,t[10]=T;else y=t[9],T=t[10];if(Or("confirm:no",y,T),d!==null){let I;if(t[11]===Symbol.for("react.memo_cache_sentinel"))I=AD.default.createElement(Box,{paddingX:1},AD.default.createElement(Text,{dimColor:!0},"Switching back to the classic renderer\u2026")),t[11]=I;else I=t[11];return I}let S;if(t[12]===Symbol.for("react.memo_cache_sentinel"))S=()=>h(""),t[12]=S;else S=t[12];let v,R;if(t[13]===Symbol.for("react.memo_cache_sentinel"))v=AD.default.createElement(Tn,null,AD.default.createElement(at,{chord:"enter",action:"send"}),AD.default.createElement(lr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"skip"})),R=AD.default.createElement(Text,null,"To help us make fullscreen mode better, what made you switch back?"),t[13]=v,t[14]=R;else v=t[13],R=t[14];let k;if(t[15]===Symbol.for("react.memo_cache_sentinel"))k=AD.default.createElement(Text,null,">"),t[15]=k;else k=t[15];let x=Math.max(10,m-8),H;if(t[16]!==c||t[17]!==a||t[18]!==x)H=AD.default.createElement(Kn,{title:"Fullscreen feedback",onCancel:S,isCancelActive:!1,inputGuide:v},R,AD.default.createElement(Box,{flexDirection:"row",gap:1},k,AD.default.createElement(Pa,{value:a,onChange:l,onSubmit:h,focus:!0,showCursor:!0,columns:x,cursorOffset:c,onChangeCursorOffset:u}))),t[16]=c,t[17]=a,t[18]=x,t[19]=H;else H=t[19];return H}
var RCl,AD,Dvo,zsm=async(e,t,n)=>{let r=n.trim().toLowerCase(),o=Ms()?"fullscreen":"default";if(r==="")return e(`Current renderer: ${o}. Usage: /tui <${Dvo.join("|")}>`,{display:"system"}),null;if(!Dvo.includes(r))return e(`Unknown renderer "${r}". Usage: /tui <${Dvo.join("|")}>`,{display:"system"}),null;let s=r,i=uVn(Fr(t),Fh(t));if(_i())return e("Background sessions always use the fullscreen renderer so scrolling and mouse work when attached. The tui setting applies to sessions started directly with `claude`.",{display:"system"}),null;if(tP())return e("Screen-reader mode always uses the classic renderer, so the tui setting has no effect while it is active.",{display:"system"}),null;let a=s==="fullscreen",l=a===Ms();if(l&&getInitialSettings().tui!==void 0)return e(`Already using the ${s} renderer.`,{display:"system"}),null;if(!l){let m=t.taskRegistry.all();if(Object.values(m).some((A)=>(A.status==="running"||A.status==="pending")&&A.type!=="remote_agent"&&A.type!=="mcp_task"))return logEvent("tengu_tui_refused",{active_tasks:!0}),e("Cannot switch renderers while work is running in the background \u2014 wait for it to finish (or stop it via /tasks), then run /tui again.",{display:"system"}),null}let c=Ove(),{error:u}=updateSettingsForSource("userSettings",{tui:s});if(u)return e(`Failed to save setting: ${u.message}`,{display:"system"}),null;let d=B1(),p=(process.env.CLAUDE_CODE_TUI_JUST_SWITCHED==="fullscreen"||c==="downsell_on"||_Z.downsellGateCached===!0)&&s==="default";if(logEvent("tengu_tui_command",{fullscreen:a,from:fromEnum(o),to:fromEnum(s),from_entry_path:fromEnum(c),session_age_ms:Math.round(process.uptime()*1000),bounce:p,scroll_decay_curve:d.useDecayCurve,scroll_base:d.base,scroll_xtermjs:d.xtermJs}),l)return e(`Already using the ${s} renderer.`,{display:"system"}),null;if(s==="default"&&(p||c==="gb_on"||c==="settings_on")&&is1PEventLoggingEnabled()&&isPolicyAllowed("allow_product_feedback"))return AD.default.createElement(Qsm,{fromEntryPath:c,bounce:p,revertKind:p||c==="gb_on"?"same_session":"later_session",carryFlags:i,onDone:e});return relaunchInto(s,i).catch((m)=>(De(m),e(`Couldn't switch renderers \u2014 ${m instanceof Error?m.message:String(m)}. The setting was saved; restart Claude Code to apply it.`,{display:"system"}),null))},Ysm="egcouldntcopytext",Xsm=1000;
var Pvo=b(()=>{readRoster();zs();Li();rs();rh();ki();Gve();ze();Ts();I1();Ct();rd();hp();Qn();Ql();Pp();Rn();tv();c8t();r5();Ivo();yr();RCl=M(rt(),1),AD=M(Te(),1),Dvo=["default","fullscreen"]});
export {xCl,relaunchInto,Jsm,Qsm,RCl,AD,Dvo,zsm,Ysm,Xsm,Pvo};
