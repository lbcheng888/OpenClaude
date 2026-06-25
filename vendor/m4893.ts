// @ts-nocheck
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function GTe(e){let t=RIo.c(4),{status:n,label:r,suffix:o}=e,s=r??n,i=n==="completed"?"success":n==="failed"?"error":n==="killed"?"warning":void 0,a;if(t[0]!==i||t[1]!==s||t[2]!==o)a=LWe.jsxs(Text,{color:i,dimColor:!0,children:["(",s,o,")"]}),t[0]=i,t[1]=s,t[2]=o,t[3]=a;else a=t[3];return a}
function XIl(e){let t=RIo.c(4),{shell:n}=e;switch(n.status){case"completed":{let r;if(t[0]===Symbol.for("react.memo_cache_sentinel"))r=LWe.jsx(GTe,{status:"completed",label:"done"}),t[0]=r;else r=t[0];return r}case"failed":{let r;if(t[1]===Symbol.for("react.memo_cache_sentinel"))r=LWe.jsx(GTe,{status:"failed",label:"error"}),t[1]=r;else r=t[1];return r}case"killed":{let r;if(t[2]===Symbol.for("react.memo_cache_sentinel"))r=LWe.jsx(GTe,{status:"killed",label:"stopped"}),t[2]=r;else r=t[2];return r}case"running":case"pending":{let r;if(t[3]===Symbol.for("react.memo_cache_sentinel"))r=LWe.jsx(GTe,{status:"running"}),t[3]=r;else r=t[3];return r}}}
var RIo,LWe;
var QIl=b(()=>{je();RIo=x(tt(),1),LWe=x(oe(),1)});
export {GTe,XIl,RIo,LWe,QIl};
