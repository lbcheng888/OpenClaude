// @ts-nocheck
import {at,rs} from "./m2546.ts";
import {ic,Ny} from "./m2574.ts";
import {Kn,Li} from "./m2572.ts";
import {Box} from "./m2422.ts";
import {pr,Yl} from "./m2562.ts";
import {NU,Jvo,uft} from "./m4921.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function $vl(e){let t=Uvl.c(20),{selectedEvent:n,selectedMatcher:r,hooksForSelectedMatcher:o,hookEventMetadata:s,onSelect:i,onCancel:a}=e,l=s.matcherMetadata!==void 0?`${n} - Matcher: ${r||"(all)"}`:n;if(o.length===0){let f,A;if(t[0]===Symbol.for("react.memo_cache_sentinel"))f=FG.createElement(at,{chord:"escape",action:"go back"}),A=FG.createElement(ic,{hint:"To add hooks, edit settings.json directly or ask Claude"},"No hooks configured for this event"),t[0]=f,t[1]=A;else f=t[0],A=t[1];let h;if(t[2]!==s.description||t[3]!==a||t[4]!==l)h=FG.createElement(Kn,{title:l,subtitle:s.description,onCancel:a,inputGuide:f},A),t[2]=s.description,t[3]=a,t[4]=l,t[5]=h;else h=t[5];return h}let c=s.description,u;if(t[6]!==o)u=o.map(Bim),t[6]=o,t[7]=u;else u=t[7];let d;if(t[8]!==o||t[9]!==i)d=(f)=>{let A=parseInt(f,10),h=o[A];if(h)i(h)},t[8]=o,t[9]=i,t[10]=d;else d=t[10];let p;if(t[11]!==a||t[12]!==u||t[13]!==d)p=FG.createElement(Box,{flexDirection:"column"},FG.createElement(pr,{options:u,onChange:d,onCancel:a})),t[11]=a,t[12]=u,t[13]=d,t[14]=p;else p=t[14];let m;if(t[15]!==s.description||t[16]!==a||t[17]!==p||t[18]!==l)m=FG.createElement(Kn,{title:l,subtitle:c,onCancel:a},p),t[15]=s.description,t[16]=a,t[17]=p,t[18]=l,t[19]=m;else m=t[19];return m}
function Bim(e,t){return{label:`[${e.config.type}] ${NU(e.config)}`,value:t.toString(),description:e.source==="pluginHook"&&e.pluginName?`${Jvo(e.source)} (${e.pluginName})`:Jvo(e.source)}}
var Uvl,FG;
var qvl=b(()=>{ze();uft();Yl();Li();Ny();rs();Uvl=M(rt(),1),FG=M(Te(),1)});
export {$vl,Bim,Uvl,FG,qvl};
