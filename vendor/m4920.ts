// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {useTheme,useCustomThemes,useThemeSetting} from "./m2285.ts";
import {buildMcpToolName,ky} from "../src/agent/2238_explicitlyRequested.ts";
import {J3,$Ue,she} from "./m2272.ts";
import {Cxl,Axl} from "./m4919.ts";
import {eC,dn} from "../src/config/0137_namespace.ts";
import {ku,rS} from "./m2582.ts";
import {Gft,FVn} from "../src/tui/4543_onThemeSelect.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
var wxl={};
ft(wxl,{call:()=>ohm});
function rhm(e){let t=Rxl.c(25),{onDone:n}=e,[r,o]=useTheme(),{customThemes:s}=useCustomThemes(),i;if(t[0]===Symbol.for("react.memo_cache_sentinel"))i={kind:"picker"},t[0]=i;else i=t[0];let[a,l]=vxl.useState(i),c;if(t[1]===Symbol.for("react.memo_cache_sentinel"))c=buildMcpToolName("themes"),t[1]=c;else c=t[1];let u=c,d=useThemeSetting(),p;if(t[2]!==d)p=J3(d),t[2]=d,t[3]=p;else p=t[3];let m=p;if(a.kind==="editor"){let y;if(t[4]!==n||t[5]!==o)y=(R)=>{o($Ue(R.slug)),n(`Using custom theme "${R.name}"`)},t[4]=n,t[5]=o,t[6]=y;else y=t[6];let S;if(t[7]===Symbol.for("react.memo_cache_sentinel"))S=()=>l({kind:"picker"}),t[7]=S;else S=t[7];let E;if(t[8]!==r||t[9]!==a.initial||t[10]!==y)E=IGt.jsx(Cxl,{initial:a.initial,defaultBase:r,onDone:y,onCancel:S}),t[8]=r,t[9]=a.initial,t[10]=y,t[11]=E;else E=t[11];return E}let f;if(t[12]!==s||t[13]!==n||t[14]!==o)f=(y)=>{o(y),n(J3(y)?`Using custom theme "${s.find((S)=>$Ue(S.slug)===y)?.name??y}"`:`Theme set to ${y}`)},t[12]=s,t[13]=n,t[14]=o,t[15]=f;else f=t[15];let h;if(t[16]===Symbol.for("react.memo_cache_sentinel"))h=u?void 0:(y)=>l({kind:"editor",initial:y}),t[16]=h;else h=t[16];let g;if(t[17]!==m)g=u?`Custom themes are disabled in safe mode \u2014 ${eC()} to create or edit them${m?`. Your saved theme "${m}" is a custom theme; selecting a preset here replaces it`:""}`:"",t[17]=m,t[18]=g;else g=t[18];let _;if(t[19]!==n)_=()=>{n("Theme picker dismissed",{display:"system"})},t[19]=n,t[20]=_;else _=t[20];let T;if(t[21]!==f||t[22]!==g||t[23]!==_)T=IGt.jsx(ku,{color:"permission",children:IGt.jsx(Gft,{onThemeSelect:f,onCustomTheme:h,helpText:g,onCancel:_,skipExitHandling:!0})}),t[21]=f,t[22]=g,t[23]=_,t[24]=T;else T=t[24];return T}
var Rxl,vxl,IGt,ohm=async(e,t)=>IGt.jsx(rhm,{onDone:e});
var kxl=b(()=>{rS();Axl();FVn();je();ky();she();dn();Rxl=x(tt(),1),vxl=x(et(),1),IGt=x(oe(),1)});
export {wxl,rhm,Rxl,vxl,IGt,ohm,kxl};
