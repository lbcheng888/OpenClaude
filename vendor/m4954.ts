// @ts-nocheck
import {at,Wo} from "./m2557.ts";
import {wl,sy} from "./m2585.ts";
import {preInitQueue,di} from "./m2583.ts";
import {Box} from "./m2432.ts";
import {hr,Ol} from "./m2573.ts";
import {rU,m0o,Cgt} from "./m4951.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function ePl(e){let t=ZDl.c(20),{selectedEvent:n,selectedMatcher:r,hooksForSelectedMatcher:o,hookEventMetadata:s,onSelect:i,onCancel:a}=e,l=s.matcherMetadata!==void 0?`${n} - Matcher: ${r||"(all)"}`:n;if(o.length===0){let f,h;if(t[0]===Symbol.for("react.memo_cache_sentinel"))f=WWe.jsx(at,{chord:"escape",action:"go back"}),h=WWe.jsx(wl,{hint:"To add hooks, edit settings.json directly or ask Claude",children:"No hooks configured for this event"}),t[0]=f,t[1]=h;else f=t[0],h=t[1];let g;if(t[2]!==s.description||t[3]!==a||t[4]!==l)g=WWe.jsx(preInitQueue,{title:l,subtitle:s.description,onCancel:a,inputGuide:f,children:h}),t[2]=s.description,t[3]=a,t[4]=l,t[5]=g;else g=t[5];return g}let c=s.description,u;if(t[6]!==o)u=o.map(Jhm),t[6]=o,t[7]=u;else u=t[7];let d;if(t[8]!==o||t[9]!==i)d=(f)=>{let h=parseInt(f,10),g=o[h];if(g)i(g)},t[8]=o,t[9]=i,t[10]=d;else d=t[10];let p;if(t[11]!==a||t[12]!==u||t[13]!==d)p=WWe.jsx(Box,{flexDirection:"column",children:WWe.jsx(hr,{options:u,onChange:d,onCancel:a})}),t[11]=a,t[12]=u,t[13]=d,t[14]=p;else p=t[14];let m;if(t[15]!==s.description||t[16]!==a||t[17]!==p||t[18]!==l)m=WWe.jsx(preInitQueue,{title:l,subtitle:c,onCancel:a,children:p}),t[15]=s.description,t[16]=a,t[17]=p,t[18]=l,t[19]=m;else m=t[19];return m}
function Jhm(e,t){return{label:`[${e.config.type}] ${rU(e.config)}`,value:t.toString(),description:e.source==="pluginHook"&&e.pluginName?`${m0o(e.source)} (${e.pluginName})`:m0o(e.source)}}
var ZDl,WWe;
var tPl=b(()=>{je();Cgt();Ol();di();sy();Wo();ZDl=x(tt(),1),WWe=x(oe(),1)});
export {ePl,Jhm,ZDl,WWe,tPl};
