// @ts-nocheck
import {fs} from "../src/api/0459_getOauthConfig.ts";
import {at,rs} from "./m2546.ts";
import {ic,Ny} from "./m2574.ts";
import {Kn,Li} from "./m2572.ts";
import {Box} from "./m2422.ts";
import {pr,Yl} from "./m2562.ts";
import {Ivl,uft} from "./m4921.ts";
import {Cn,dr} from "./m231.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Wvl(e){let t=jvl.c(26),{selectedEvent:n,matchersForSelectedEvent:r,hooksByEventAndMatcher:o,eventDescription:s,onSelect:i,onCancel:a}=e,l;if(t[0]!==o||t[1]!==r||t[2]!==n){let A;if(t[4]!==o||t[5]!==n)A=(h)=>{let g=o[n]?.[h]||[],_=fs(g.map(Uim));return{matcher:h,sources:_,hookCount:g.length}},t[4]=o,t[5]=n,t[6]=A;else A=t[6];l=r.map(A),t[0]=o,t[1]=r,t[2]=n,t[3]=l}else l=t[3];let c=l;if(r.length===0){let A=`${n} - Matchers`,h,g;if(t[7]===Symbol.for("react.memo_cache_sentinel"))h=UG.createElement(at,{chord:"escape",action:"go back"}),g=UG.createElement(ic,{hint:"To add hooks, edit settings.json directly or ask Claude"},"No hooks configured for this event"),t[7]=h,t[8]=g;else h=t[7],g=t[8];let _;if(t[9]!==s||t[10]!==a||t[11]!==A)_=UG.createElement(Kn,{title:A,subtitle:s,onCancel:a,inputGuide:h},g),t[9]=s,t[10]=a,t[11]=A,t[12]=_;else _=t[12];return _}let u=`${n} - Matchers`,d;if(t[13]!==c)d=c.map(Fim),t[13]=c,t[14]=d;else d=t[14];let p;if(t[15]!==i)p=(A)=>{i(A)},t[15]=i,t[16]=p;else p=t[16];let m;if(t[17]!==a||t[18]!==d||t[19]!==p)m=UG.createElement(Box,{flexDirection:"column"},UG.createElement(pr,{options:d,onChange:p,onCancel:a})),t[17]=a,t[18]=d,t[19]=p,t[20]=m;else m=t[20];let f;if(t[21]!==s||t[22]!==a||t[23]!==u||t[24]!==m)f=UG.createElement(Kn,{title:u,subtitle:s,onCancel:a},m),t[21]=s,t[22]=a,t[23]=u,t[24]=m,t[25]=f;else f=t[25];return f}
function Fim(e){let t=e.sources.map(Ivl).join(", "),n=e.matcher||"(all)";return{label:`[${t}] ${n}`,value:e.matcher,description:`${e.hookCount} ${Cn(e.hookCount,"hook")}`}}
function Uim(e){return e.source}
var jvl,UG;
var Gvl=b(()=>{ze();uft();dr();Yl();Li();Ny();rs();jvl=M(rt(),1),UG=M(Te(),1)});
export {Wvl,Fim,Uim,jvl,UG,Gvl};
