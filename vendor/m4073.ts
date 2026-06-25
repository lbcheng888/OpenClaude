// @ts-nocheck
import {Lw} from "./m4308.ts";
import {Yn,Pl} from "./m2465.ts";
import {dce,hdt} from "./m3994.ts";
import {Emo,Wdt,Rmo,po} from "../src/tools/5224_userPromptCount.ts";
import {a9n,_do} from "./m3958.ts";
import {Nqa,Fqa} from "./m4072.ts";
import {Link} from "./m2437.ts";
import {Text} from "./m2433.ts";
import {MRt,Pa} from "./m720.ts";
import {lve,ri} from "../src/tools/2235_userFacingName.ts";
import {wC,initModelResolutionModule} from "../src/core/3298_result.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Cmo(e){let t=Bqa.c(19),{progressMessagesForMessage:n,tool:r,tools:o,param:s,verbose:i,isTranscriptMode:a}=e;if(typeof s.content==="string"&&s.content.includes(Lw)){let c;if(t[0]===Symbol.for("react.memo_cache_sentinel"))c=bce.jsx(Yn,{height:1,children:bce.jsx(dce,{})}),t[0]=c;else c=t[0];return c}if(typeof s.content==="string"&&s.content.startsWith(Emo)){let c;if(t[1]!==s.content)c=s.content.substring(Emo.length),t[1]=s.content,t[2]=c;else c=t[2];let u=c,d;if(t[3]!==u)d=bce.jsx(a9n,{plan:u}),t[3]=u,t[4]=d;else d=t[4];return d}if(typeof s.content==="string"&&s.content.startsWith(Wdt)){let c;if(t[5]===Symbol.for("react.memo_cache_sentinel"))c=bce.jsx(Nqa,{}),t[5]=c;else c=t[5];return c}if(typeof s.content==="string"&&Rmo(s.content)){let c;if(t[6]===Symbol.for("react.memo_cache_sentinel"))c=bce.jsx(Link,{url:"https://code.claude.com/docs/s/claude-code-auto-mode"}),t[6]=c;else c=t[6];let u=c,d;if(t[11]===Symbol.for("react.memo_cache_sentinel"))d=bce.jsx(Yn,{children:bce.jsxs(Text,{dimColor:!0,children:["Denied by auto mode classifier ",MRt," see ",u]})}),t[11]=d;else d=t[11];return d}let l;if(t[12]!==a||t[13]!==s.content||t[14]!==n||t[15]!==r||t[16]!==o||t[17]!==i)l=r?.renderToolUseErrorMessage?.(s.content,{progressMessagesForMessage:lve(n),tools:o,verbose:i,isTranscriptMode:a})??bce.jsx(wC,{result:s.content,verbose:i}),t[12]=a,t[13]=s.content,t[14]=n,t[15]=r,t[16]=o,t[17]=i,t[18]=l;else l=t[18];return l}
var Bqa,bce;
var Amo=b(()=>{Pa();je();ri();po();initModelResolutionModule();hdt();Pl();_do();Fqa();Bqa=x(tt(),1),bce=x(oe(),1)});
export {Cmo,Bqa,bce,Amo};
