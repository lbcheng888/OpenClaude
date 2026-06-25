// @ts-nocheck
import {bo,uo} from "./m2468.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {bx,lJ} from "./m4620.ts";
import {pl,Wu} from "./m438.ts";
import {getIsScrollDraining,lt} from "../src/session/0132_sent.ts";
import {Dit,tIe,zae} from "./m3263.ts";
import {useInterval} from "./m2456.ts";
import {nt} from "./m127.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {dn} from "../src/config/0137_namespace.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
function Ycc(){let e=jcc.c(12),t=bo(),[n,r]=Nyt.useState(MGm),o;if(e[0]===Symbol.for("react.memo_cache_sentinel"))o=new Set,e[0]=o;else o=e[0];let s=Nyt.useRef(o),i;if(e[1]!==t)i=(f,h)=>{let g=`${f}:${h}`;if(s.current.has(g))return;s.current.add(g),logForDebugging(`LSP error: ${f} - ${h}`),t((_)=>{let T=new Set(_.plugins.errors.map(LGm)),y=`generic-error:${f}:${h}`;if(T.has(y))return _;return{..._,plugins:{..._.plugins,errors:[..._.plugins.errors,{type:"generic-error",source:f,error:h}]}}})},e[1]=t,e[2]=i;else i=e[2];let a=i,l;if(e[3]!==t)l=(f)=>{t((h)=>{if(h.setupIssues.lspFailedCount===f)return h;return bx("LSP",f),{...h,setupIssues:{...h.setupIssues,lspFailedCount:f}}})},e[3]=t,e[4]=l;else l=e[4];let c=l,u;if(e[5]!==a||e[6]!==c)u=()=>{if(pl())return;if(getIsScrollDraining())return;let f=Dit();if(f.status==="failed"){a("lsp-manager",f.error.message),c(1),r(!1);return}if(f.status==="pending"||f.status==="not-started")return;let h=tIe();if(h){let g=h.getAllServers(),_=0;for(let[T,y]of g)if(y.state==="error"&&y.lastError)_++,a(T,y.lastError.message);c(_)}},e[5]=a,e[6]=c,e[7]=u;else u=e[7];let d=u;useInterval(d,n?OGm:null);let p,m;if(e[8]!==d||e[9]!==n)p=()=>{if(pl()||!n)return;d()},m=[d,n],e[8]=d,e[9]=n,e[10]=p,e[11]=m;else p=e[10],m=e[11];Nyt.useEffect(p,m)}
function LGm(e){if(e.type==="generic-error")return`generic-error:${e.source}:${e.error}`;return`${e.type}:${e.source}`}
function MGm(){return nt("true")}
var jcc,Nyt,OGm=5000;
var Jcc=b(()=>{lt();je();Wu();zae();uo();qe();dn();lJ();jcc=x(tt(),1),Nyt=x(et(),1)});
export {Ycc,LGm,MGm,jcc,Nyt,OGm,Jcc};
