// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {isAnthropicAuthEnabled,Ao} from "../config/2031_withOAuthRefreshLock.ts";
import {useTheme} from "../../vendor/m2274.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnumOpt} from "../../vendor/m5.ts";
import {Ie,Oe,ln} from "../telemetry/0594_feature_name.ts";
import {xA,jH} from "../../vendor/m2566.ts";
import {Box} from "../../vendor/m2422.ts";
import {jpt,T8n} from "./4523_onThemeSelect.ts";
import {Text} from "../../vendor/m2423.ts";
import {tZn,Zrc} from "../../vendor/m5641.ts";
import {Newline} from "../../vendor/m2436.ts";
import {aD,bne} from "../../vendor/m4590.ts";
import {Vrc,Krc} from "../../vendor/m5639.ts";
import {$rc,qrc} from "../config/5638_headers.ts";
import {YC,sn} from "../config/0047_namespace.ts";
import {MB,eYe} from "../../vendor/m1292.ts";
import {getCustomApiKeyStatus,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {ApproveApiKey,b1o} from "../../vendor/m5638.ts";
import {ConsoleOAuthFlow,HUt} from "./3858_ConsoleOAuthFlow.ts";
import {shouldOfferTerminalSetup,setupTerminal,Cwe} from "../../vendor/m2517.ts";
import {je} from "../../vendor/m577.ts";
import {ac,e_} from "../../vendor/m3338.ts";
import {Tn,zs} from "../../vendor/m2554.ts";
import {at,rs} from "../../vendor/m2546.ts";
import {Wo,Ts} from "../../vendor/m2542.ts";
import {OPe,gWt} from "../../vendor/m5233.ts";
import {ze} from "../../vendor/m2452.ts";
import {Lr} from "../../vendor/m578.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
var noc={};
isFullscreenWithTTY(noc,{SkippableStep:()=>SkippableStep,Onboarding:()=>Onboarding});
function Onboarding({onDone:e}){let[t,n]=jd.useState(0),[r,o]=jd.useState(!1),[s]=jd.useState(()=>isAnthropicAuthEnabled()),[i,a]=useTheme();jd.useEffect(()=>{logEvent("tengu_began_setup",{oauthEnabled:s})},[s]);function l(){if(t<h.length-1){let T=t+1;n(T),logEvent("tengu_onboarding_step",{oauthEnabled:s,stepId:fromEnumOpt(h[T]?.id)}),Ie("onboarding_step_complete")}else Ie("onboarding_complete"),e()}function c(T){a(T),l()}let u=xA(),d=jd.default.createElement(Box,{marginX:1},jd.default.createElement(jpt,{onThemeSelect:c,showIntroText:!0,helpText:"To change this later, run /theme",hideEscToCancel:!0,skipExitHandling:!0})),p=jd.default.createElement(Box,{flexDirection:"column",gap:1,paddingLeft:1},jd.default.createElement(Text,{bold:!0},"Security notes:"),jd.default.createElement(Box,{flexDirection:"column",width:70},jd.default.createElement(tZn,null,jd.default.createElement(tZn.Item,null,jd.default.createElement(Text,null,"Claude can make mistakes."),jd.default.createElement(Text,{dimColor:!0,wrap:"wrap"},"You're responsible for Claude's actions and should always",jd.default.createElement(Newline,null),"review them, especially when running code.",jd.default.createElement(Newline,null))),jd.default.createElement(tZn.Item,null,jd.default.createElement(Text,null,"Due to prompt injection risks, only use it with code you trust"),jd.default.createElement(aD,{url:"https://code.claude.com/docs/en/security"})))),jd.default.createElement(Vrc,null)),m=jd.default.createElement($rc,{onSuccess:l}),f=jd.useMemo(()=>{if(!process.env.ANTHROPIC_API_KEY||YC())return"";let T=MB(process.env.ANTHROPIC_API_KEY);if(getCustomApiKeyStatus(T)==="new")return T},[]);function A(T){if(T)o(!0);l()}let h=[];if(s)h.push({id:"preflight",component:m});if(h.push({id:"theme",component:d}),f)h.push({id:"api-key",component:jd.default.createElement(ApproveApiKey,{customApiKeyTruncated:f,onDone:A})});if(s)h.push({id:"oauth",component:jd.default.createElement(SkippableStep,{skip:r,onSkip:l},jd.default.createElement(Box,{flexDirection:"column",gap:1,paddingLeft:1},jd.default.createElement(ConsoleOAuthFlow,{onDone:l,urlOutdent:1})))});if(h.push({id:"security",component:p}),shouldOfferTerminalSetup())h.push({id:"terminal-setup",component:jd.default.createElement(Box,{flexDirection:"column",gap:1,paddingLeft:1},jd.default.createElement(Text,{bold:!0},"Use Claude Code's terminal setup?"),jd.default.createElement(Box,{flexDirection:"column",width:70,gap:1},jd.default.createElement(Text,null,"For the optimal coding experience, enable the recommended settings",jd.default.createElement(Newline,null),"for your terminal:"," ",je.terminal==="Apple_Terminal"?"Option+Enter for newlines and visual bell":"Shift+Enter for newlines"),jd.default.createElement(ac,{confirmLabel:"Yes, use recommended settings",cancelLabel:"No, maybe later with /terminal-setup",onConfirm:()=>void setupTerminal(i).then(()=>Ie("onboarding_terminal_setup")).catch(()=>Oe("onboarding_terminal_setup","onboarding_terminal_setup_failed")).finally(l),onCancel:l}),jd.default.createElement(Text,{dimColor:!0},u.pending?jd.default.createElement(jd.default.Fragment,null,"Press ",u.keyName," again to exit"):jd.default.createElement(Tn,null,jd.default.createElement(at,{chord:"enter",action:"confirm"}),jd.default.createElement(at,{chord:"escape",action:"skip"})))))});let g=h[t],_=jd.useCallback(()=>{if(t===h.length-1)e();else l()},[t,e,l]),y=jd.useCallback(()=>{l()},[l]);return Wo({"confirm:yes":_},{context:"Confirmation",isActive:g?.id==="security"}),Wo({"confirm:no":y},{context:"Confirmation",isActive:g?.id==="terminal-setup"}),jd.default.createElement(Box,{flexDirection:"column"},jd.default.createElement(OPe,null),jd.default.createElement(Box,{flexDirection:"column",marginTop:1},g?.component,u.pending&&jd.default.createElement(Box,{padding:1},jd.default.createElement(Text,{dimColor:!0},"Press ",u.keyName," again to exit"))))}
function SkippableStep(e){let t=eoc.c(4),{skip:n,onSkip:r,children:o}=e,s,i;if(t[0]!==r||t[1]!==n)s=()=>{if(n)r()},i=[n,r],t[0]=r,t[1]=n,t[2]=s,t[3]=i;else s=t[2],i=t[3];if(jd.useEffect(s,i),n)return null;return o}
var eoc,jd;
var roc=b(()=>{Ct();Cwe();jH();ze();Ts();ln();Ao();eYe();Qn();Lr();sn();qrc();b1o();HUt();zs();e_();bne();rs();gWt();Krc();T8n();Zrc();eoc=M(rt(),1),jd=M(Te(),1)});
export {noc,Onboarding,SkippableStep,eoc,jd,roc};
