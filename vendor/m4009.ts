// @ts-nocheck
import {mI,Nao,wct,Uao,lo} from "../src/tools/5190_userPromptCount.ts";
import {Gn,sc} from "./m2455.ts";
import {fce,rct} from "./m3928.ts";
import {n2n,Mao} from "./m4007.ts";
import {dBa,pBa} from "./m4008.ts";
import {Link} from "./m2427.ts";
import {Text} from "./m2423.ts";
import {cEt,sl} from "./m715.ts";
import {Eve,Ri} from "../src/tools/2227_userFacingName.ts";
import {wC,jq} from "../src/tui/3282_result.tsx";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Bao(e){let t=mBa.c(19),{progressMessagesForMessage:n,tool:r,tools:o,param:s,verbose:i,isTranscriptMode:a}=e;if(typeof s.content==="string"&&s.content.includes(mI)){let c;if(t[0]===Symbol.for("react.memo_cache_sentinel"))c=kN.createElement(Gn,{height:1},kN.createElement(fce,null)),t[0]=c;else c=t[0];return c}if(typeof s.content==="string"&&s.content.startsWith(Nao)){let c;if(t[1]!==s.content)c=s.content.substring(Nao.length),t[1]=s.content,t[2]=c;else c=t[2];let u=c,d;if(t[3]!==u)d=kN.createElement(n2n,{plan:u}),t[3]=u,t[4]=d;else d=t[4];return d}if(typeof s.content==="string"&&s.content.startsWith(wct)){let c;if(t[5]===Symbol.for("react.memo_cache_sentinel"))c=kN.createElement(dBa,null),t[5]=c;else c=t[5];return c}if(typeof s.content==="string"&&Uao(s.content)){let c;if(t[6]===Symbol.for("react.memo_cache_sentinel"))c=kN.createElement(Link,{url:"https://code.claude.com/docs/s/claude-code-auto-mode"}),t[6]=c;else c=t[6];let u=c,d;if(t[11]===Symbol.for("react.memo_cache_sentinel"))d=kN.createElement(Gn,null,kN.createElement(Text,{dimColor:!0},"Denied by auto mode classifier ",cEt," see ",u)),t[11]=d;else d=t[11];return d}let l;if(t[12]!==a||t[13]!==s.content||t[14]!==n||t[15]!==r||t[16]!==o||t[17]!==i)l=r?.renderToolUseErrorMessage?.(s.content,{progressMessagesForMessage:Eve(n),tools:o,verbose:i,isTranscriptMode:a})??kN.createElement(wC,{result:s.content,verbose:i}),t[12]=a,t[13]=s.content,t[14]=n,t[15]=r,t[16]=o,t[17]=i,t[18]=l;else l=t[18];return l}
var mBa,kN;
var Fao=b(()=>{sl();ze();Ri();lo();jq();rct();sc();Mao();pBa();mBa=M(rt(),1),kN=M(Te(),1)});
export {Bao,mBa,kN,Fao};
