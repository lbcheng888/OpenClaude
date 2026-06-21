// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {Wo,Ts} from "./m2542.ts";
import {X7r,Mee,Ok,ab} from "../src/config/3178_path.ts";
import {je} from "./m577.ts";
import {Text} from "./m2423.ts";
import {AS,Yz} from "./m3174.ts";
import {Oq,Qxe} from "./m3175.ts";
import {Box} from "./m2422.ts";
import {Kn,Li} from "./m2572.ts";
import {at,rs} from "./m2546.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {k1,a5} from "../src/config/2187_terminal.ts";
import {Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {ze} from "./m2452.ts";
import {Lr} from "./m578.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var jZi={};
isFullscreenWithTTY(jZi,{hasIdeOnboardingDialogBeenShown:()=>hasIdeOnboardingDialogBeenShown,IdeOnboardingDialog:()=>IdeOnboardingDialog});
function IdeOnboardingDialog(e){let t=$Zi.c(22),{onDone:n,installationStatus:r}=e;x9d();let o;if(t[0]!==n)o={"confirm:yes":n,"confirm:no":n},t[0]=n,t[1]=o;else o=t[1];let s;if(t[2]===Symbol.for("react.memo_cache_sentinel"))s={context:"Confirmation"},t[2]=s;else s=t[2];Wo(o,s);let i;if(t[3]!==r?.ideType)i=r?.ideType??X7r(),t[3]=r?.ideType,t[4]=i;else i=t[4];let a=i,l=Mee(a),c;if(t[5]!==a)c=Ok(a),t[5]=a,t[6]=c;else c=t[6];let u=c,d=r?.installedVersion,p=l?"plugin":"extension",m=je.platform==="darwin"?"Cmd+Option+K":"Ctrl+Alt+K",f;if(t[7]===Symbol.for("react.memo_cache_sentinel"))f=tI.default.createElement(Text,{color:"claude"},"\u273B "),t[7]=f;else f=t[7];let A;if(t[8]!==u)A=tI.default.createElement(tI.default.Fragment,null,f,tI.default.createElement(Text,null,"Welcome to Claude Code for ",u)),t[8]=u,t[9]=A;else A=t[9];let h=d?`installed ${p} v${d}`:void 0,g;if(t[10]===Symbol.for("react.memo_cache_sentinel"))g=tI.default.createElement(Text,{color:"suggestion"},"\u29C9 open files"),t[10]=g;else g=t[10];let _;if(t[11]===Symbol.for("react.memo_cache_sentinel"))_=tI.default.createElement(AS,null,"Claude has context of ",g," ","and ",tI.default.createElement(Text,{color:"suggestion"},"\u29C9 selected lines")),t[11]=_;else _=t[11];let y;if(t[12]===Symbol.for("react.memo_cache_sentinel"))y=tI.default.createElement(AS,null,"Review Claude Code's changes"," ",tI.default.createElement(Oq,{added:11,removed:22})," in the comfort of your IDE"),t[12]=y;else y=t[12];let T;if(t[13]===Symbol.for("react.memo_cache_sentinel"))T=tI.default.createElement(AS,null,"Cmd+Esc",tI.default.createElement(Text,{dimColor:!0}," for Quick Launch")),t[13]=T;else T=t[13];let S;if(t[14]===Symbol.for("react.memo_cache_sentinel"))S=tI.default.createElement(Box,{flexDirection:"column",gap:1},_,y,T,tI.default.createElement(AS,null,m,tI.default.createElement(Text,{dimColor:!0}," to reference files or lines in your input"))),t[14]=S;else S=t[14];let v;if(t[15]!==n||t[16]!==A||t[17]!==h)v=tI.default.createElement(Kn,{title:A,subtitle:h,color:"ide",onCancel:n,hideInputGuide:!0},S),t[15]=n,t[16]=A,t[17]=h,t[18]=v;else v=t[18];let R;if(t[19]===Symbol.for("react.memo_cache_sentinel"))R=tI.default.createElement(Box,{paddingX:1},tI.default.createElement(Text,{dimColor:!0,italic:!0},"Press ",tI.default.createElement(at,{chord:"enter",action:"continue"}))),t[19]=R;else R=t[19];let k;if(t[20]!==v)k=tI.default.createElement(tI.default.Fragment,null,v,R),t[20]=v,t[21]=k;else k=t[21];return k}
function hasIdeOnboardingDialogBeenShown(){let e=getGlobalConfig(),t=k1.terminal||"unknown";return e.hasIdeOnboardingBeenShown?.[t]===!0}
function x9d(){if(hasIdeOnboardingDialogBeenShown())return;let e=k1.terminal||"unknown";saveGlobalConfig((t)=>({...t,hasIdeOnboardingBeenShown:{...t.hasIdeOnboardingBeenShown,[e]:!0}})),Ie("onboarding_ide_dialog_shown")}
var $Zi,tI;
var J7r=b(()=>{a5();ze();Ts();ln();Qn();Lr();ab();Yz();Li();Qxe();rs();$Zi=M(rt(),1),tI=M(Te(),1)});
export {jZi,IdeOnboardingDialog,hasIdeOnboardingDialogBeenShown,x9d,$Zi,tI,J7r};
