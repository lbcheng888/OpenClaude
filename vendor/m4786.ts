// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {Or,ss} from "./m2553.ts";
import {qm,GI,sP} from "./m4535.ts";
import {Box} from "./m2432.ts";
import {Ny,uq} from "./m3355.ts";
import {bn,Is} from "./m2565.ts";
import {at,Wo} from "./m2557.ts";
import {ku,rS} from "./m2582.ts";
import {Text} from "./m2433.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {Kht} from "./m4785.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
var ZAl={};
ft(ZAl,{call:()=>wlm});
function Clm(e){let t=xko.c(19),{onDone:n}=e,r;if(t[0]===Symbol.for("react.memo_cache_sentinel"))r={ios:"",android:""},t[0]=r;else r=t[0];let[o,s]=Ezn.useState(r),i,a;if(t[1]===Symbol.for("react.memo_cache_sentinel"))i=()=>{(async function(){let[S,E]=await Promise.all([Iko.toString(bzn.ios.url,{type:"utf8",errorCorrectionLevel:"L",margin:2}),Iko.toString(bzn.android.url,{type:"utf8",errorCorrectionLevel:"L",margin:2})]);s({ios:S,android:E})})().catch(Alm)},a=[],t[1]=i,t[2]=a;else i=t[1],a=t[2];Ezn.useEffect(i,a);let l;if(t[3]!==n)l=()=>{n()},t[3]=n,t[4]=l;else l=t[4];let c=l,u;if(t[5]===Symbol.for("react.memo_cache_sentinel"))u={context:"Confirmation"},t[5]=u;else u=t[5];Or("confirm:no",c,u);let d;if(t[6]!==n)d=function(y){if(y.key==="q"&&!y.ctrl&&!y.meta)y.preventDefault(),n()},t[6]=n,t[7]=d;else d=t[7];let p=d,m;if(t[8]!==o.ios)m=kL.jsx(qm,{title:"iOS",id:"ios",children:kL.jsx(QAl,{qrCode:o.ios,url:bzn.ios.url})}),t[8]=o.ios,t[9]=m;else m=t[9];let f;if(t[10]!==o.android)f=kL.jsx(qm,{title:"Android",id:"android",children:kL.jsx(QAl,{qrCode:o.android,url:bzn.android.url})}),t[10]=o.android,t[11]=f;else f=t[11];let h;if(t[12]!==m||t[13]!==f)h=kL.jsxs(GI,{title:"Mobile",children:[m,f]}),t[12]=m,t[13]=f,t[14]=h;else h=t[14];let g;if(t[15]===Symbol.for("react.memo_cache_sentinel"))g=kL.jsx(Box,{marginTop:1,children:kL.jsx(Ny,{children:kL.jsxs(bn,{children:[kL.jsx(at,{chord:["left","right"],action:"switch"}),kL.jsx(at,{chord:"escape",action:"close"})]})})}),t[15]=g;else g=t[15];let _;if(t[16]!==p||t[17]!==h)_=kL.jsx(ku,{children:kL.jsxs(Box,{flexDirection:"column",onKeyDown:p,children:[h,g]})}),t[16]=p,t[17]=h,t[18]=_;else _=t[18];return _}
function Alm(){}
function QAl(e){let t=xko.c(11),{qrCode:n,url:r}=e,o,s,i;if(t[0]!==n){let c=n.split(`
`).filter(vlm);o=Box,s="column",i=c.map(Rlm),t[0]=n,t[1]=o,t[2]=s,t[3]=i}else o=t[1],s=t[2],i=t[3];let a;if(t[4]!==r)a=kL.jsx(Text,{dimColor:!0,children:r}),t[4]=r,t[5]=a;else a=t[5];let l;if(t[6]!==o||t[7]!==s||t[8]!==i||t[9]!==a)l=kL.jsxs(o,{flexDirection:s,children:[i,a]}),t[6]=o,t[7]=s,t[8]=i,t[9]=a,t[10]=l;else l=t[10];return l}
function Rlm(e,t){return kL.jsx(Text,{children:e},t)}
function vlm(e){return e.length>0}
async function wlm(e){return kL.jsx(Clm,{onDone:e})}
var xko,Iko,Ezn,kL,bzn;
var eRl=b(()=>{Is();uq();Wo();rS();sP();je();ss();xko=x(tt(),1),Iko=x(Kht(),1),Ezn=x(et(),1),kL=x(oe(),1),bzn={ios:{url:"https://apps.apple.com/app/claude-by-anthropic/id6473753684"},android:{url:"https://play.google.com/store/apps/details?id=com.anthropic.claude"}}});
export {ZAl,Clm,Alm,QAl,Rlm,vlm,wlm,xko,Iko,Ezn,kL,bzn,eRl};
