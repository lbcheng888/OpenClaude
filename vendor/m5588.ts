// @ts-nocheck
import {bo,configProtoStore} from "./m2458.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {lD,EJ} from "./m4592.ts";
import {ec,Dd} from "./m687.ts";
import {getIsScrollDraining,lt} from "../src/session/0131_sent.ts";
import {Iot,mke,Kae} from "./m3247.ts";
import {useInterval} from "./m2446.ts";
import {st} from "./m5.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {sn} from "../src/config/0047_namespace.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function atc(){let e=itc.c(12),t=bo(),[n,r]=hht.useState(a$m),o;if(e[0]===Symbol.for("react.memo_cache_sentinel"))o=new Set,e[0]=o;else o=e[0];let s=hht.useRef(o),i;if(e[1]!==t)i=(f,A)=>{let h=`${f}:${A}`;if(s.current.has(h))return;s.current.add(h),logForDebugging(`LSP error: ${f} - ${A}`),t((g)=>{let _=new Set(g.plugins.errors.map(i$m)),y=`generic-error:${f}:${A}`;if(_.has(y))return g;return{...g,plugins:{...g.plugins,errors:[...g.plugins.errors,{type:"generic-error",source:f,error:A}]}}})},e[1]=t,e[2]=i;else i=e[2];let a=i,l;if(e[3]!==t)l=(f)=>{t((A)=>{if(A.setupIssues.lspFailedCount===f)return A;return lD("LSP",f),{...A,setupIssues:{...A.setupIssues,lspFailedCount:f}}})},e[3]=t,e[4]=l;else l=e[4];let c=l,u;if(e[5]!==a||e[6]!==c)u=()=>{if(ec())return;if(getIsScrollDraining())return;let f=Iot();if(f.status==="failed"){a("lsp-manager",f.error.message),c(1),r(!1);return}if(f.status==="pending"||f.status==="not-started")return;let A=mke();if(A){let h=A.getAllServers(),g=0;for(let[_,y]of h)if(y.state==="error"&&y.lastError)g++,a(_,y.lastError.message);c(g)}},e[5]=a,e[6]=c,e[7]=u;else u=e[7];let d=u;useInterval(d,n?s$m:null);let p,m;if(e[8]!==d||e[9]!==n)p=()=>{if(ec()||!n)return;d()},m=[d,n],e[8]=d,e[9]=n,e[10]=p,e[11]=m;else p=e[10],m=e[11];hht.useEffect(p,m)}
function i$m(e){if(e.type==="generic-error")return`generic-error:${e.source}:${e.error}`;return`${e.type}:${e.source}`}
function a$m(){return st("true")}
var itc,hht,s$m=5000;
var ltc=b(()=>{lt();ze();Dd();Kae();configProtoStore();qe();sn();EJ();itc=M(rt(),1),hht=M(Te(),1)});
export {atc,i$m,a$m,itc,hht,s$m,ltc};
