// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {saveGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {Ie,isTmuxControlMode,ln} from "../telemetry/0594_feature_name.ts";
import {Tn,zs} from "../../vendor/m2554.ts";
import {at,rs} from "../../vendor/m2546.ts";
import {lr,readRoster} from "../../vendor/m2547.ts";
import {Text} from "../../vendor/m2423.ts";
import {isInProductPermissionsEnabled,oL} from "../mcp/2581_trackClaudeInChromeTabId.ts";
import {Box} from "../../vendor/m2422.ts";
import {ac,e_} from "../../vendor/m3338.ts";
import {Kn,Li} from "../../vendor/m2572.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
var joc={};
isFullscreenWithTTY(joc,{ChromeAutoEnableDialog:()=>ChromeAutoEnableDialog});
function ChromeAutoEnableDialog(e){let t=qoc.c(16),{onDone:n,isDontAskMode:r,isAutoMode:o}=e,s=r===void 0?!1:r,i=o===void 0?!1:o,a;if(t[0]===Symbol.for("react.memo_cache_sentinel"))a=[],t[0]=a;else a=t[0];yj.useEffect(n3m,a);let l=yj.useRef(!1),c;if(t[1]!==n)c=function(T){if(l.current)return;if(l.current=!0,saveGlobalConfig((S)=>({...S,claudeInChromeDefaultEnabled:T,...T&&{hasCompletedClaudeInChromeOnboarding:!0}})),T)Ie("chrome_auto_enable_prompt");else isTmuxControlMode("chrome_auto_enable_prompt","declined");n(T)},t[1]=n,t[2]=c;else c=t[2];let u=c,d;if(t[3]!==u)d=()=>u(!1),t[3]=u,t[4]=d;else d=t[4];let p;if(t[5]===Symbol.for("react.memo_cache_sentinel"))p=yj.default.createElement(Tn,null,yj.default.createElement(at,{chord:"enter",action:"confirm"}),yj.default.createElement(lr,{action:"confirm:no",context:"Confirmation",fallback:"Esc",description:"keep browser tools off"})),t[5]=p;else p=t[5];let m;if(t[6]===Symbol.for("react.memo_cache_sentinel"))m=yj.default.createElement(Text,null,"Claude will use your Chrome browser by default \u2014 navigating sites, filling forms, and capturing screenshots in your existing session."),t[6]=m;else m=t[6];let f=isInProductPermissionsEnabled()?s?"This session is in Don't Ask mode, so browser actions that need approval are skipped rather than prompted.":i?"This session is in Auto mode, so an AI classifier approves routine browser actions \u2014 you are only prompted when it is unsure.":"Browser actions still go through Claude's regular permission prompts before they run.":"Site-level permissions come from the Chrome extension.",A;if(t[7]===Symbol.for("react.memo_cache_sentinel"))A=yj.default.createElement(Text,{bold:!0,color:"permission"},"/chrome"),t[7]=A;else A=t[7];let h;if(t[8]!==f)h=yj.default.createElement(Box,{flexDirection:"column",gap:1},m,yj.default.createElement(Text,{dimColor:!0},f," ","Turn browser tools off for future sessions with"," ",A,".")),t[8]=f,t[9]=h;else h=t[9];let g;if(t[10]!==u)g=yj.default.createElement(ac,{confirmLabel:"Yes, use my browser",cancelLabel:"No, keep browser tools off",onConfirm:()=>u(!0),onCancel:()=>u(!1)}),t[10]=u,t[11]=g;else g=t[11];let _;if(t[12]!==h||t[13]!==g||t[14]!==d)_=yj.default.createElement(Kn,{title:"Claude in Chrome extension detected",color:"permission",onCancel:d,inputGuide:p},h,g),t[12]=h,t[13]=g,t[14]=d,t[15]=_;else _=t[15];return _}
function n3m(){logEvent("tengu_chrome_auto_enable_prompt_shown",{})}
var qoc,yj;
var Woc=b(()=>{Ct();ze();ln();oL();Qn();readRoster();zs();e_();Li();rs();qoc=M(rt(),1),yj=M(Te(),1)});
export {joc,ChromeAutoEnableDialog,n3m,qoc,yj,Woc};
