// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {useTheme,useCustomThemes,useThemeSetting} from "./m2274.ts";
import {hc,Iy} from "../src/agent/2230_explicitlyRequested.ts";
import {k4,jFe,zfe} from "./m2263.ts";
import {mCl,fCl} from "./m4889.ts";
import {KE,sn} from "../src/config/0047_namespace.ts";
import {Wu,lS} from "./m2571.ts";
import {jpt,T8n} from "../src/tui/4523_onThemeSelect.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var gCl={};
isFullscreenWithTTY(gCl,{call:()=>Vsm});
function Gsm(e){let t=ACl.c(25),{onDone:n}=e,[r,o]=useTheme(),{customThemes:s}=useCustomThemes(),i;if(t[0]===Symbol.for("react.memo_cache_sentinel"))i={kind:"picker"},t[0]=i;else i=t[0];let[a,l]=hCl.useState(i),c;if(t[1]===Symbol.for("react.memo_cache_sentinel"))c=hc("themes"),t[1]=c;else c=t[1];let u=c,d=useThemeSetting(),p;if(t[2]!==d)p=k4(d),t[2]=d,t[3]=p;else p=t[3];let m=p;if(a.kind==="editor"){let y;if(t[4]!==n||t[5]!==o)y=(v)=>{o(jFe(v.slug)),n(`Using custom theme "${v.name}"`)},t[4]=n,t[5]=o,t[6]=y;else y=t[6];let T;if(t[7]===Symbol.for("react.memo_cache_sentinel"))T=()=>l({kind:"picker"}),t[7]=T;else T=t[7];let S;if(t[8]!==r||t[9]!==a.initial||t[10]!==y)S=bye.createElement(mCl,{initial:a.initial,defaultBase:r,onDone:y,onCancel:T}),t[8]=r,t[9]=a.initial,t[10]=y,t[11]=S;else S=t[11];return S}let f;if(t[12]!==s||t[13]!==n||t[14]!==o)f=(y)=>{o(y),n(k4(y)?`Using custom theme "${s.find((T)=>jFe(T.slug)===y)?.name??y}"`:`Theme set to ${y}`)},t[12]=s,t[13]=n,t[14]=o,t[15]=f;else f=t[15];let A;if(t[16]===Symbol.for("react.memo_cache_sentinel"))A=u?void 0:(y)=>l({kind:"editor",initial:y}),t[16]=A;else A=t[16];let h;if(t[17]!==m)h=u?`Custom themes are disabled in safe mode \u2014 ${KE()} to create or edit them${m?`. Your saved theme "${m}" is a custom theme; selecting a preset here replaces it`:""}`:"",t[17]=m,t[18]=h;else h=t[18];let g;if(t[19]!==n)g=()=>{n("Theme picker dismissed",{display:"system"})},t[19]=n,t[20]=g;else g=t[20];let _;if(t[21]!==f||t[22]!==h||t[23]!==g)_=bye.createElement(Wu,{color:"permission"},bye.createElement(jpt,{onThemeSelect:f,onCustomTheme:A,helpText:h,onCancel:g,skipExitHandling:!0})),t[21]=f,t[22]=h,t[23]=g,t[24]=_;else _=t[24];return _}
var ACl,bye,hCl,Vsm=async(e,t)=>bye.createElement(Gsm,{onDone:e});
var _Cl=b(()=>{lS();fCl();T8n();ze();Iy();zfe();sn();ACl=M(rt(),1),bye=M(Te(),1),hCl=M(Te(),1)});
export {gCl,Gsm,ACl,bye,hCl,Vsm,_Cl};
