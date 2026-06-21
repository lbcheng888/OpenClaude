// @ts-nocheck
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function yye(e){let t=cvo.c(4),{status:n,label:r,suffix:o}=e,s=r??n,i=n==="completed"?"success":n==="failed"?"error":n==="killed"?"warning":void 0,a;if(t[0]!==i||t[1]!==s||t[2]!==o)a=rft.default.createElement(Text,{color:i,dimColor:!0},"(",s,o,")"),t[0]=i,t[1]=s,t[2]=o,t[3]=a;else a=t[3];return a}
function Vbl(e){let t=cvo.c(4),{shell:n}=e;switch(n.status){case"completed":{let r;if(t[0]===Symbol.for("react.memo_cache_sentinel"))r=rft.default.createElement(yye,{status:"completed",label:"done"}),t[0]=r;else r=t[0];return r}case"failed":{let r;if(t[1]===Symbol.for("react.memo_cache_sentinel"))r=rft.default.createElement(yye,{status:"failed",label:"error"}),t[1]=r;else r=t[1];return r}case"killed":{let r;if(t[2]===Symbol.for("react.memo_cache_sentinel"))r=rft.default.createElement(yye,{status:"killed",label:"stopped"}),t[2]=r;else r=t[2];return r}case"running":case"pending":{let r;if(t[3]===Symbol.for("react.memo_cache_sentinel"))r=rft.default.createElement(yye,{status:"running"}),t[3]=r;else r=t[3];return r}}}
var cvo,rft;
var Kbl=b(()=>{ze();cvo=M(rt(),1),rft=M(Te(),1)});
export {yye,Vbl,cvo,rft,Kbl};
