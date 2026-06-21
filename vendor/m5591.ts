// @ts-nocheck
import {ec,Dd} from "./m687.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {U0,hS} from "../src/config/4438_source.ts";
import {Text} from "./m2423.ts";
import {Bs,rA} from "./m2550.ts";
import {Ie,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function DQn(){let e=ytc.c(6),[t,n]=IQn.useState(null),r=IQn.useRef(!1),o;if(e[0]!==t)o=(c)=>{if(ec())return;if(t)return;if(r.current)return;r.current=!0,c().then((u)=>{if(u)n(u)}).catch(De).finally(()=>{r.current=!1})},e[0]=t,e[1]=o;else o=e[1];let s=o,i;if(e[2]===Symbol.for("react.memo_cache_sentinel"))i=()=>n(null),e[2]=i;else i=e[2];let a=i,l;if(e[3]!==t||e[4]!==s)l={recommendation:t,clearRecommendation:a,tryResolve:s},e[3]=t,e[4]=s,e[5]=l;else l=e[5];return l}
async function PQn(e,t,n,r,o){try{let s=await U0(e);if(!s)throw Error(`Plugin ${e} not found in marketplace`);await o(s),r({key:`${n}-installed`,kind:"feedback",jsx:v5e.createElement(Text,{color:"success"},v5e.createElement(Bs,{status:"success",withSpace:!0}),t," installed \xB7 restart to apply"),priority:"immediate",timeoutMs:5000}),Ie("plugin_recommendation_install")}catch(s){logForDebugging(`Failed to install plugin ${e}: ${s instanceof Error?s.message:String(s)}`,{level:"error"}),r({key:`${n}-install-failed`,jsx:v5e.createElement(Text,{color:"error"},"Failed to install ",t),priority:"immediate",timeoutMs:5000}),Oe("plugin_recommendation_install","install_failed")}}
var ytc,v5e,IQn;
var QMo=b(()=>{rA();ze();Dd();ln();qe();Rn();hS();ytc=M(rt(),1),v5e=M(Te(),1),IQn=M(Te(),1)});
export {DQn,PQn,ytc,v5e,IQn,QMo};
