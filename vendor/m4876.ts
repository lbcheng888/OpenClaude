// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {_t,uo} from "./m2468.ts";
import {Or,ss} from "./m2553.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {pl,sM,Wu} from "./m438.ts";
import {ku,rS} from "./m2582.ts";
import {Ny,uq} from "./m3355.ts";
import {at,Wo} from "./m2557.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {Kht} from "./m4785.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
var uIl={};
ft(uIl,{call:()=>xmm});
function vmm(e){let t=lIl.c(15),{onDone:n}=e,r=_t(Imm),[o,s]=Ijn.useState(""),i,a;if(t[0]!==r)i=()=>{if(!r)return;let u=r;(async function(){let m=await cIl.toString(u,{type:"utf8",errorCorrectionLevel:"L",margin:0});s(m)})().catch(Hmm)},a=[r],t[0]=r,t[1]=i,t[2]=a;else i=t[1],a=t[2];Ijn.useEffect(i,a);let l;if(t[3]===Symbol.for("react.memo_cache_sentinel"))l={context:"Confirmation"},t[3]=l;else l=t[3];if(Or("confirm:no",n,l),!r){let u,d;if(t[4]===Symbol.for("react.memo_cache_sentinel"))u=logFeatureBad.jsx(Box,{marginBottom:1,children:logFeatureBad.jsx(Text,{bold:!0,children:"Cloud session"})}),d=pl()?logFeatureBad.jsx(Text,{children:sM("fanout")?"This session's browser link isn't available from this view.":"This session is connected directly and has no browser link \u2014 only sessions started with `claude --cloud` can be opened in the browser."}):logFeatureBad.jsx(Text,{color:"warning",children:"Not in remote mode. Start with `claude --cloud` to use this command."}),t[4]=u,t[5]=d;else u=t[4],d=t[5];let p;if(t[6]===Symbol.for("react.memo_cache_sentinel"))p=logFeatureBad.jsxs(ku,{children:[u,d,logFeatureBad.jsx(Box,{marginTop:1,children:logFeatureBad.jsx(Ny,{children:logFeatureBad.jsx(at,{chord:"escape",action:"close"})})})]}),t[6]=p;else p=t[6];return p}let c;if(t[7]!==o||t[8]!==r){let u=o.split(`
`).filter(kmm),d=u.length===0,p;if(t[10]===Symbol.for("react.memo_cache_sentinel"))p=logFeatureBad.jsx(Box,{marginBottom:1,children:logFeatureBad.jsx(Text,{bold:!0,children:"Cloud session"})}),t[10]=p;else p=t[10];let m;if(t[11]===Symbol.for("react.memo_cache_sentinel"))m=logFeatureBad.jsx(Text,{dimColor:!0,children:"Open in browser: "}),t[11]=m;else m=t[11];let f;if(t[12]!==r)f=logFeatureBad.jsxs(Box,{children:[m,logFeatureBad.jsx(Text,{color:"ide",children:r})]}),t[12]=r,t[13]=f;else f=t[13];let h;if(t[14]===Symbol.for("react.memo_cache_sentinel"))h=logFeatureBad.jsx(Box,{marginBottom:1,children:logFeatureBad.jsx(Ny,{children:logFeatureBad.jsx(at,{chord:"escape",action:"cancel",parens:!0})})}),t[14]=h;else h=t[14];c=logFeatureBad.jsxs(ku,{children:[p,f,h,d?logFeatureBad.jsx(Text,{dimColor:!0,children:"Generating QR code\u2026"}):u.map(wmm)]}),t[7]=o,t[8]=r,t[9]=c}else c=t[9];return c}
function wmm(e,t){return logFeatureBad.jsx(Text,{children:e},t)}
function kmm(e){return e.length>0}
function Hmm(e){logForDebugging("QR code generation failed",e)}
function Imm(e){return e.remoteSessionUrl}
var lIl,cIl,Ijn,logFeatureBad,xmm=async(e)=>logFeatureBad.jsx(vmm,{onDone:e});
var dIl=b(()=>{uq();Wo();rS();je();ss();Wu();uo();qe();lIl=x(tt(),1),cIl=x(Kht(),1),Ijn=x(et(),1),logFeatureBad=x(oe(),1)});
export {uIl,vmm,wmm,kmm,Hmm,Imm,lIl,cIl,Ijn,logFeatureBad,xmm,dIl};
