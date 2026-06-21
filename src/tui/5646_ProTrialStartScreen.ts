// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {startProTrial,getProTrialDurationDays,$mt} from "../../vendor/m4779.ts";
import {K_,Se,bt} from "../../vendor/m195.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {De,Rn} from "../session/0615_length.ts";
import {Wo,Ts} from "../../vendor/m2542.ts";
import {OPe,gWt} from "../../vendor/m5233.ts";
import {Text} from "../../vendor/m2423.ts";
import {Box} from "../../vendor/m2422.ts";
import {tp,_x} from "./3835_mode.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
var Roc={};
isFullscreenWithTTY(Roc,{ProTrialStartScreen:()=>ProTrialStartScreen});
function ProTrialStartScreen(e){let t=voc.c(9),{onDone:n}=e,[r,o]=woc.useState("idle"),s;if(t[0]!==n||t[1]!==r)s={"confirm:yes":()=>{if(r==="starting")return;if(r==="error"){n();return}o("starting"),logEvent("tengu_pro_trial_start_pressed",{}),startProTrial().then(()=>{logEvent("tengu_pro_trial_start_ok",{}),n()}).catch((p)=>{if(K_(p))logForDebugging(`Failed to start pro trial: ${Se(p)}`,{level:"error"});else De(p);logEvent("tengu_pro_trial_start_error",{}),o("error")})}},t[0]=n,t[1]=r,t[2]=s;else s=t[2];let i;if(t[3]===Symbol.for("react.memo_cache_sentinel"))i={context:"Confirmation"},t[3]=i;else i=t[3];Wo(s,i);let a;if(t[4]===Symbol.for("react.memo_cache_sentinel"))a=getProTrialDurationDays(),t[4]=a;else a=t[4];let l=a,c;if(t[5]===Symbol.for("react.memo_cache_sentinel"))c=kI.createElement(OPe,null),t[5]=c;else c=t[5];let u;if(t[6]===Symbol.for("react.memo_cache_sentinel"))u=kI.createElement(Text,null,l!==null?`Your Pro plan includes ${l} days of Claude Code.`:"Your Pro plan includes a Claude Code trial."),t[6]=u;else u=t[6];let d;if(t[7]!==r)d=kI.createElement(Box,{flexDirection:"column",paddingX:1,gap:1},c,u,r==="starting"?kI.createElement(Box,null,kI.createElement(tp,null),kI.createElement(Text,null," Starting your trial\u2026")):r==="error"?kI.createElement(Text,{color:"error"},"Couldn't start your trial. Press ",kI.createElement(Text,{bold:!0},"Enter")," to continue."):kI.createElement(Text,{color:"permission"},"Press ",kI.createElement(Text,{bold:!0},"Enter")," to start your trial")),t[7]=r,t[8]=d;else d=t[8];return d}
var voc,kI,woc;
var xoc=b(()=>{ze();Ts();Ct();$mt();qe();bt();Rn();gWt();_x();voc=M(rt(),1),kI=M(Te(),1),woc=M(Te(),1)});
export {Roc,ProTrialStartScreen,voc,kI,woc,xoc};
