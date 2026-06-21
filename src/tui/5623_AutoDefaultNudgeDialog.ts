// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {fromEnum} from "../../vendor/m5.ts";
import {xA,jH} from "../../vendor/m2566.ts";
import {updateSettingsForSource,yr} from "../config/0740_updateSettingsForSource.ts";
import {saveGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {Box} from "../../vendor/m2422.ts";
import {Text} from "../../vendor/m2423.ts";
import {oQ,eC} from "../../vendor/m717.ts";
import {Tm,Fk} from "../../vendor/m3341.ts";
import {pr,Yl} from "../../vendor/m2562.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
var rrc={};
isFullscreenWithTTY(rrc,{AutoDefaultNudgeDialog:()=>AutoDefaultNudgeDialog});
function AutoDefaultNudgeDialog(e){let t=nrc.c(18),{currentMode:n,onDone:r}=e,o,s;if(t[0]!==n)o=()=>{logEvent("tengu_auto_default_nudge_shown",{current_mode:fromEnum(n)})},s=[n],t[0]=n,t[1]=o,t[2]=s;else o=t[1],s=t[2];mTe.useEffect(o,s),xA();let i;if(t[3]!==n||t[4]!==r)i=function(h){if(h==="accept")updateSettingsForSource("userSettings",{permissions:{defaultMode:"auto"}});saveGlobalConfig(u9m),logEvent("tengu_auto_default_nudge_resolved",{choice:fromEnum(h),current_mode:fromEnum(n)}),r(h==="accept")},t[3]=n,t[4]=r,t[5]=i;else i=t[5];let a=i,l;if(t[6]===Symbol.for("react.memo_cache_sentinel"))l=mTe.default.createElement(Box,{marginBottom:1,flexDirection:"column"},mTe.default.createElement(Text,null,"Auto mode lets Claude handle permission prompts automatically. Claude checks each tool call for risky actions and prompt injection before executing, runs the ones it assesses as lower-risk, and blocks the rest.")),t[6]=l;else l=t[6];let c;if(t[7]===Symbol.for("react.memo_cache_sentinel"))c={label:"Yes, set auto mode as my default permission mode",value:"accept"},t[7]=c;else c=t[7];let u;if(t[8]!==n)u=oQ(n).toLowerCase(),t[8]=n,t[9]=u;else u=t[9];let d=`No, keep ${u}`,p;if(t[10]!==d)p=[c,{label:d,value:"decline"}],t[10]=d,t[11]=p;else p=t[11];let m;if(t[12]!==a)m=()=>a("decline"),t[12]=a,t[13]=m;else m=t[13];let f;if(t[14]!==a||t[15]!==p||t[16]!==m)f=mTe.default.createElement(Tm,{title:"Make auto mode your default permission mode?"},mTe.default.createElement(Box,{flexDirection:"column",paddingX:2,paddingY:1},l,mTe.default.createElement(Box,null,mTe.default.createElement(pr,{options:p,onChange:a,onCancel:m})))),t[14]=a,t[15]=p,t[16]=m,t[17]=f;else f=t[17];return f}
function u9m(e){return e.hasSeenAutoDefaultNudge?e:{...e,hasSeenAutoDefaultNudge:!0}}
var nrc,mTe;
var orc=b(()=>{Ct();jH();ze();Qn();eC();yr();Yl();Fk();nrc=M(rt(),1),mTe=M(Te(),1)});
export {rrc,AutoDefaultNudgeDialog,u9m,nrc,mTe,orc};
