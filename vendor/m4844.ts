// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {mt,configProtoStore} from "./m2458.ts";
import {Or,Ts} from "./m2542.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {ec,YM,Dd} from "./m687.ts";
import {Wu,lS} from "./m2571.ts";
import {Uy,zq} from "./m3339.ts";
import {at,rs} from "./m2546.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Omt} from "./m4753.ts";
import {Te} from "./m2253.ts";
var rbl={};
isFullscreenWithTTY(rbl,{call:()=>gom});
function pom(e){let t=tbl.c(15),{onDone:n}=e,r=mt(hom),[o,s]=$Gn.useState(""),i,a;if(t[0]!==r)i=()=>{if(!r)return;let u=r;(async function(){let m=await nbl.toString(u,{type:"utf8",errorCorrectionLevel:"L",margin:0});s(m)})().catch(Aom)},a=[r],t[0]=r,t[1]=i,t[2]=a;else i=t[1],a=t[2];$Gn.useEffect(i,a);let l;if(t[3]===Symbol.for("react.memo_cache_sentinel"))l={context:"Confirmation"},t[3]=l;else l=t[3];if(Or("confirm:no",n,l),!r){let u,d;if(t[4]===Symbol.for("react.memo_cache_sentinel"))u=kf.createElement(Box,{marginBottom:1},kf.createElement(Text,{bold:!0},"Cloud session")),d=ec()?kf.createElement(Text,null,YM("fanout")?"This session's browser link isn't available from this view.":"This session is connected directly and has no browser link \u2014 only sessions started with `claude --cloud` can be opened in the browser."):kf.createElement(Text,{color:"warning"},"Not in remote mode. Start with `claude --cloud` to use this command."),t[4]=u,t[5]=d;else u=t[4],d=t[5];let p;if(t[6]===Symbol.for("react.memo_cache_sentinel"))p=kf.createElement(Wu,null,u,d,kf.createElement(Box,{marginTop:1},kf.createElement(Uy,null,kf.createElement(at,{chord:"escape",action:"close"})))),t[6]=p;else p=t[6];return p}let c;if(t[7]!==o||t[8]!==r){let u=o.split(`
`).filter(fom),d=u.length===0,p;if(t[10]===Symbol.for("react.memo_cache_sentinel"))p=kf.createElement(Box,{marginBottom:1},kf.createElement(Text,{bold:!0},"Cloud session")),t[10]=p;else p=t[10];let m;if(t[11]===Symbol.for("react.memo_cache_sentinel"))m=kf.createElement(Text,{dimColor:!0},"Open in browser: "),t[11]=m;else m=t[11];let f;if(t[12]!==r)f=kf.createElement(Box,null,m,kf.createElement(Text,{color:"ide"},r)),t[12]=r,t[13]=f;else f=t[13];let A;if(t[14]===Symbol.for("react.memo_cache_sentinel"))A=kf.createElement(Box,{marginBottom:1},kf.createElement(Uy,null,kf.createElement(at,{chord:"escape",action:"cancel",parens:!0}))),t[14]=A;else A=t[14];c=kf.createElement(Wu,null,p,f,A,d?kf.createElement(Text,{dimColor:!0},"Generating QR code\u2026"):u.map(mom)),t[7]=o,t[8]=r,t[9]=c}else c=t[9];return c}
function mom(e,t){return kf.createElement(Text,{key:t},e)}
function fom(e){return e.length>0}
function Aom(e){logForDebugging("QR code generation failed",e)}
function hom(e){return e.remoteSessionUrl}
var tbl,nbl,kf,$Gn,gom=async(e)=>kf.createElement(pom,{onDone:e});
var obl=b(()=>{zq();rs();lS();ze();Ts();Dd();configProtoStore();qe();tbl=M(rt(),1),nbl=M(Omt(),1),kf=M(Te(),1),$Gn=M(Te(),1)});
export {rbl,pom,mom,fom,Aom,hom,tbl,nbl,kf,$Gn,gom,obl};
