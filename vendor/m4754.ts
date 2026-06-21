// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {Or,Ts} from "./m2542.ts";
import {wf,_I,$P} from "./m4515.ts";
import {Box} from "./m2422.ts";
import {Uy,zq} from "./m3339.ts";
import {Tn,zs} from "./m2554.ts";
import {at,rs} from "./m2546.ts";
import {Wu,lS} from "./m2571.ts";
import {Text} from "./m2423.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Omt} from "./m4753.ts";
import {Te} from "./m2253.ts";
var rgl={};
isFullscreenWithTTY(rgl,{call:()=>fZp});
function uZp(e){let t=pEo.c(19),{onDone:n}=e,r;if(t[0]===Symbol.for("react.memo_cache_sentinel"))r={ios:"",android:""},t[0]=r;else r=t[0];let[o,s]=MWn.useState(r),i,a;if(t[1]===Symbol.for("react.memo_cache_sentinel"))i=()=>{(async function(){let[T,S]=await Promise.all([dEo.toString(LWn.ios.url,{type:"utf8",errorCorrectionLevel:"L",margin:2}),dEo.toString(LWn.android.url,{type:"utf8",errorCorrectionLevel:"L",margin:2})]);s({ios:T,android:S})})().catch(dZp)},a=[],t[1]=i,t[2]=a;else i=t[1],a=t[2];MWn.useEffect(i,a);let l;if(t[3]!==n)l=()=>{n()},t[3]=n,t[4]=l;else l=t[4];let c=l,u;if(t[5]===Symbol.for("react.memo_cache_sentinel"))u={context:"Confirmation"},t[5]=u;else u=t[5];Or("confirm:no",c,u);let d;if(t[6]!==n)d=function(y){if(y.key==="q"&&!y.ctrl&&!y.meta)y.preventDefault(),n()},t[6]=n,t[7]=d;else d=t[7];let p=d,m;if(t[8]!==o.ios)m=L_.createElement(wf,{title:"iOS",id:"ios"},L_.createElement(ngl,{qrCode:o.ios,url:LWn.ios.url})),t[8]=o.ios,t[9]=m;else m=t[9];let f;if(t[10]!==o.android)f=L_.createElement(wf,{title:"Android",id:"android"},L_.createElement(ngl,{qrCode:o.android,url:LWn.android.url})),t[10]=o.android,t[11]=f;else f=t[11];let A;if(t[12]!==m||t[13]!==f)A=L_.createElement(_I,{title:"Mobile"},m,f),t[12]=m,t[13]=f,t[14]=A;else A=t[14];let h;if(t[15]===Symbol.for("react.memo_cache_sentinel"))h=L_.createElement(Box,{marginTop:1},L_.createElement(Uy,null,L_.createElement(Tn,null,L_.createElement(at,{chord:["left","right"],action:"switch"}),L_.createElement(at,{chord:"escape",action:"close"})))),t[15]=h;else h=t[15];let g;if(t[16]!==p||t[17]!==A)g=L_.createElement(Wu,null,L_.createElement(Box,{flexDirection:"column",onKeyDown:p},A,h)),t[16]=p,t[17]=A,t[18]=g;else g=t[18];return g}
function dZp(){}
function ngl(e){let t=pEo.c(11),{qrCode:n,url:r}=e,o,s,i;if(t[0]!==n){let c=n.split(`
`).filter(mZp);o=Box,s="column",i=c.map(pZp),t[0]=n,t[1]=o,t[2]=s,t[3]=i}else o=t[1],s=t[2],i=t[3];let a;if(t[4]!==r)a=L_.createElement(Text,{dimColor:!0},r),t[4]=r,t[5]=a;else a=t[5];let l;if(t[6]!==o||t[7]!==s||t[8]!==i||t[9]!==a)l=L_.createElement(o,{flexDirection:s},i,a),t[6]=o,t[7]=s,t[8]=i,t[9]=a,t[10]=l;else l=t[10];return l}
function pZp(e,t){return L_.createElement(Text,{key:t},e)}
function mZp(e){return e.length>0}
async function fZp(e){return L_.createElement(uZp,{onDone:e})}
var pEo,dEo,L_,MWn,LWn;
var ogl=b(()=>{zs();zq();rs();lS();$P();ze();Ts();pEo=M(rt(),1),dEo=M(Omt(),1),L_=M(Te(),1),MWn=M(Te(),1),LWn={ios:{url:"https://apps.apple.com/app/claude-by-anthropic/id6473753684"},android:{url:"https://play.google.com/store/apps/details?id=com.anthropic.claude"}}});
export {rgl,uZp,dZp,ngl,pZp,mZp,fZp,pEo,dEo,L_,MWn,LWn,ogl};
