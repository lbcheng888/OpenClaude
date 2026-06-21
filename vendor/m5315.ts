// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {mt,configProtoStore} from "./m2458.ts";
import {Text} from "./m2423.ts";
import {fc,sl} from "./m715.ts";
import {sy,e9} from "./m2808.ts";
import {Dv,VZ} from "../src/telemetry/2527_VZ.ts";
import {useAnimationFrame} from "../src/config/2442_isVisible.ts";
import {Oy,XS} from "../src/config/2341_XS.ts";
import {eL,nL,tL,GZ} from "./m2525.ts";
import {Box} from "./m2422.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var K4l={};
isFullscreenWithTTY(K4l,{VoiceWarmupHint:()=>VoiceWarmupHint,VoiceIndicator:()=>VoiceIndicator});
function VoiceIndicator(e){let t=rGt.c(2),n;if(t[0]!==e)n=wI.createElement(ikm,{...e}),t[0]=e,t[1]=n;else n=t[1];return n}
function ikm(e){let t=rGt.c(3),{voiceState:n}=e,r=mt(akm);switch(n){case"recording":{if(r==="tap"){let s;if(t[0]===Symbol.for("react.memo_cache_sentinel"))s=wI.createElement(Text,null,wI.createElement(Text,{color:"error"},fc," REC"),wI.createElement(Text,{dimColor:!0}," \xB7 tap to send")),t[0]=s;else s=t[0];return s}let o;if(t[1]===Symbol.for("react.memo_cache_sentinel"))o=wI.createElement(Text,{dimColor:!0},"listening\u2026"),t[1]=o;else o=t[1];return o}case"processing":{let o;if(t[2]===Symbol.for("react.memo_cache_sentinel"))o=wI.createElement(lkm,null),t[2]=o;else o=t[2];return o}case"idle":return null}}
function akm(e){return e.settings.voice?.mode??"hold"}
function VoiceWarmupHint(){let e=rGt.c(1),t;if(e[0]===Symbol.for("react.memo_cache_sentinel"))t=wI.createElement(Text,{dimColor:!0},"keep holding\u2026"),e[0]=t;else t=e[0];return t}
function lkm(){let e=rGt.c(8),t=sy(),n=Dv(t.prefersReducedMotion),[r,o]=useAnimationFrame(n?null:50);if(n){let d;if(e[0]===Symbol.for("react.memo_cache_sentinel"))d=wI.createElement(Text,{color:"warning"},"Voice: processing\u2026"),e[0]=d;else d=e[0];return d}let s=o/1000,i=(Math.sin(s*Math.PI*2/skm)+1)/2,a;if(e[1]!==i){let d=Oy()?eL(i):i;a=nL(tL(rkm,okm,d)),e[1]=i,e[2]=a}else a=e[2];let l=a,c;if(e[3]!==l)c=wI.createElement(Text,{color:l},"Voice: processing\u2026"),e[3]=l,e[4]=c;else c=e[4];let u;if(e[5]!==r||e[6]!==c)u=wI.createElement(Box,{ref:r},c),e[5]=r,e[6]=c,e[7]=u;else u=e[7];return u}
var rGt,wI,rkm,okm,skm=2;
var XYn=b(()=>{sl();e9();XS();ze();configProtoStore();VZ();GZ();rGt=M(rt(),1),wI=M(Te(),1),rkm={r:153,g:153,b:153},okm={r:185,g:185,b:185}});
export {K4l,VoiceIndicator,ikm,akm,VoiceWarmupHint,lkm,rGt,wI,rkm,okm,skm,XYn};
