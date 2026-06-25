// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {_t,uo} from "./m2468.ts";
import {Text} from "./m2433.ts";
import {Ql,Pa} from "./m720.ts";
import {rvn,ovn} from "./m2538.ts";
import {ay,E$} from "./m2821.ts";
import {MA,qZ} from "../src/telemetry/2538_qZ.ts";
import {useAnimationFrame} from "../src/config/2452_isVisible.ts";
import {xy,nS} from "../src/config/2351_nS.ts";
import {_O,TO,yO,$Z} from "./m2536.ts";
import {Box} from "./m2432.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
var tzl={};
ft(tzl,{VoiceWarmupHint:()=>VoiceWarmupHint,VoiceIndicator:()=>VoiceIndicator,VoiceCursorChar:()=>VoiceCursorChar});
function VoiceIndicator(e){let t=ryt.c(2),n;if(t[0]!==e)n=isToolSearchOptimisticallyEnabled.jsx(L1m,{...e}),t[0]=e,t[1]=n;else n=t[1];return n}
function L1m(e){let t=ryt.c(3),{voiceState:n}=e,r=_t(M1m);switch(n){case"recording":{if(r==="tap"){let s;if(t[0]===Symbol.for("react.memo_cache_sentinel"))s=isToolSearchOptimisticallyEnabled.jsxs(Text,{children:[isToolSearchOptimisticallyEnabled.jsxs(Text,{color:"error",children:[Ql," REC"]}),isToolSearchOptimisticallyEnabled.jsx(Text,{dimColor:!0,children:" \xB7 tap to send"})]}),t[0]=s;else s=t[0];return s}let o;if(t[1]===Symbol.for("react.memo_cache_sentinel"))o=isToolSearchOptimisticallyEnabled.jsx(Text,{dimColor:!0,children:"listening\u2026"}),t[1]=o;else o=t[1];return o}case"processing":{let o;if(t[2]===Symbol.for("react.memo_cache_sentinel"))o=isToolSearchOptimisticallyEnabled.jsx(N1m,{}),t[2]=o;else o=t[2];return o}case"idle":return null}}
function M1m(e){return e.settings.voice?.mode??"hold"}
function VoiceCursorChar(){let e=ryt.c(2),[,t]=rvn(),n;if(e[0]!==t)n=t?isToolSearchOptimisticallyEnabled.jsx(Text,{color:t.hex,children:t.char}):null,e[0]=t,e[1]=n;else n=e[1];return n}
function VoiceWarmupHint(){let e=ryt.c(1),t;if(e[0]===Symbol.for("react.memo_cache_sentinel"))t=isToolSearchOptimisticallyEnabled.jsx(Text,{dimColor:!0,children:"keep holding\u2026"}),e[0]=t;else t=e[0];return t}
function N1m(){let e=ryt.c(8),t=ay(),n=MA(t.prefersReducedMotion),[r,o]=useAnimationFrame(n?null:50);if(n){let d;if(e[0]===Symbol.for("react.memo_cache_sentinel"))d=isToolSearchOptimisticallyEnabled.jsx(Text,{color:"warning",children:"Voice: processing\u2026"}),e[0]=d;else d=e[0];return d}let s=o/1000,i=(Math.sin(s*Math.PI*2/O1m)+1)/2,a;if(e[1]!==i){let d=xy()?_O(i):i;a=TO(yO(D1m,P1m,d)),e[1]=i,e[2]=a}else a=e[2];let l=a,c;if(e[3]!==l)c=isToolSearchOptimisticallyEnabled.jsx(Text,{color:l,children:"Voice: processing\u2026"}),e[3]=l,e[4]=c;else c=e[4];let u;if(e[5]!==r||e[6]!==c)u=isToolSearchOptimisticallyEnabled.jsx(Box,{ref:r,children:c}),e[5]=r,e[6]=c,e[7]=u;else u=e[7];return u}
var ryt,isToolSearchOptimisticallyEnabled,D1m,P1m,O1m=2;
var cer=b(()=>{Pa();E$();ovn();nS();je();uo();qZ();$Z();ryt=x(tt(),1),isToolSearchOptimisticallyEnabled=x(oe(),1),D1m={r:153,g:153,b:153},P1m={r:185,g:185,b:185}});
export {tzl,VoiceIndicator,L1m,M1m,VoiceCursorChar,VoiceWarmupHint,N1m,ryt,isToolSearchOptimisticallyEnabled,D1m,P1m,O1m,cer};
