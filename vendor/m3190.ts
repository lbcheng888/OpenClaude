// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {Oo,ss} from "./m2553.ts";
import {DXr,Iee,tH,uS} from "../src/config/3192_path.ts";
import {Ne} from "./m583.ts";
import {Text} from "./m2433.ts";
import {cS,Rj} from "./m3188.ts";
import {J4,$He} from "./m3189.ts";
import {Box} from "./m2432.ts";
import {preInitQueue,di} from "./m2583.ts";
import {at,Wo} from "./m2557.ts";
import {getGlobalConfig,saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {WM,E8} from "../src/config/2192_terminal.ts";
import {He,mn} from "../src/telemetry/0600_feature_name.ts";
import {je} from "./m2462.ts";
import {Ir} from "./m584.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
var Gia={};
ft(Gia,{hasIdeOnboardingDialogBeenShown:()=>hasIdeOnboardingDialogBeenShown,IdeOnboardingDialog:()=>IdeOnboardingDialog});
function IdeOnboardingDialog(e){let t=qia.c(22),{onDone:n,installationStatus:r}=e;u7d();let o;if(t[0]!==n)o={"confirm:yes":n,"confirm:no":n},t[0]=n,t[1]=o;else o=t[1];let s;if(t[2]===Symbol.for("react.memo_cache_sentinel"))s={context:"Confirmation"},t[2]=s;else s=t[2];Oo(o,s);let i;if(t[3]!==r?.ideType)i=r?.ideType??DXr(),t[3]=r?.ideType,t[4]=i;else i=t[4];let a=i,l=Iee(a),c;if(t[5]!==a)c=tH(a),t[5]=a,t[6]=c;else c=t[6];let u=c,d=r?.installedVersion,p=l?"plugin":"extension",m=Ne.platform==="darwin"?"Cmd+Option+K":"Ctrl+Alt+K",f;if(t[7]===Symbol.for("react.memo_cache_sentinel"))f=Aw.jsx(Text,{color:"claude",children:"\u273B "}),t[7]=f;else f=t[7];let h;if(t[8]!==u)h=Aw.jsxs(Aw.Fragment,{children:[f,Aw.jsxs(Text,{children:["Welcome to Claude Code for ",u]})]}),t[8]=u,t[9]=h;else h=t[9];let g=d?`installed ${p} v${d}`:void 0,_;if(t[10]===Symbol.for("react.memo_cache_sentinel"))_=Aw.jsx(Text,{color:"suggestion",children:"\u29C9 open files"}),t[10]=_;else _=t[10];let T;if(t[11]===Symbol.for("react.memo_cache_sentinel"))T=Aw.jsxs(cS,{children:["Claude has context of ",_," ","and ",Aw.jsx(Text,{color:"suggestion",children:"\u29C9 selected lines"})]}),t[11]=T;else T=t[11];let y;if(t[12]===Symbol.for("react.memo_cache_sentinel"))y=Aw.jsxs(cS,{children:["Review Claude Code's changes"," ",Aw.jsx(J4,{added:11,removed:22})," in the comfort of your IDE"]}),t[12]=y;else y=t[12];let S;if(t[13]===Symbol.for("react.memo_cache_sentinel"))S=Aw.jsxs(cS,{children:["Cmd+Esc",Aw.jsx(Text,{dimColor:!0,children:" for Quick Launch"})]}),t[13]=S;else S=t[13];let E;if(t[14]===Symbol.for("react.memo_cache_sentinel"))E=Aw.jsxs(Box,{flexDirection:"column",gap:1,children:[T,y,S,Aw.jsxs(cS,{children:[m,Aw.jsx(Text,{dimColor:!0,children:" to reference files or lines in your input"})]})]}),t[14]=E;else E=t[14];let R;if(t[15]!==n||t[16]!==h||t[17]!==g)R=Aw.jsx(preInitQueue,{title:h,subtitle:g,color:"ide",onCancel:n,hideInputGuide:!0,children:E}),t[15]=n,t[16]=h,t[17]=g,t[18]=R;else R=t[18];let w;if(t[19]===Symbol.for("react.memo_cache_sentinel"))w=Aw.jsx(Box,{paddingX:1,children:Aw.jsxs(Text,{dimColor:!0,italic:!0,children:["Press ",Aw.jsx(at,{chord:"enter",action:"continue"})]})}),t[19]=w;else w=t[19];let H;if(t[20]!==R)H=Aw.jsxs(Aw.Fragment,{children:[R,w]}),t[20]=R,t[21]=H;else H=t[21];return H}
function hasIdeOnboardingDialogBeenShown(){let e=getGlobalConfig(),t=WM.terminal||"unknown";return e.hasIdeOnboardingBeenShown?.[t]===!0}
function u7d(){if(hasIdeOnboardingDialogBeenShown())return;let e=WM.terminal||"unknown";saveGlobalConfig((t)=>({...t,hasIdeOnboardingBeenShown:{...t.hasIdeOnboardingBeenShown,[e]:!0}})),He("onboarding_ide_dialog_shown")}
var qia,Aw;
var xXr=b(()=>{E8();je();ss();mn();tr();Ir();uS();Rj();di();$He();Wo();qia=x(tt(),1),Aw=x(oe(),1)});
export {Gia,IdeOnboardingDialog,hasIdeOnboardingDialogBeenShown,u7d,qia,Aw,xXr};
