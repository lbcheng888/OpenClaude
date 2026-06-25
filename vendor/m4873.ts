// @ts-nocheck
import {_g,zR} from "./m2562.ts";
import {pgt,Rjn} from "../src/telemetry/4866_cloneViable.ts";
import {saveGlobalConfig,getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {Rte,A6e} from "../src/config/3990_maxFiles.ts";
import {Text} from "./m2433.ts";
import {preInitQueue,di} from "./m2583.ts";
import {uIo,dIo} from "../src/tui/4873_sourcePromise.ts";
import {Box} from "./m2432.ts";
import {Link} from "./m2437.ts";
import {WPe,OWe} from "../src/permissions/4872_plan.ts";
import {hr,Ol} from "./m2573.ts";
import {ay,E$} from "./m2821.ts";
import {MA,qZ} from "../src/telemetry/2538_qZ.ts";
import {useAnimationFrame} from "../src/config/2452_isVisible.ts";
import {A0e,J$t} from "./m3847.ts";
import {Y$t,A2n} from "./m3846.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {bGt} from "../src/session/4865_flags.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function nIl(e){let t=kjn.c(24),{subtitle:n,body:r,scope:o,onProceed:s,onCancel:i}=e;_g("ultrareview-launch");let[a]=kue.useState(gmm),[l,c]=kue.useState(!1),u;if(t[0]===Symbol.for("react.memo_cache_sentinel"))u=new AbortController,t[0]=u;else u=t[0];let d=kue.useRef(u),p;if(t[1]!==a)p=()=>a?pgt().catch(hmm):null,t[1]=a,t[2]=p;else p=t[2];let[m]=kue.useState(p),f;if(t[3]!==i||t[4]!==s||t[5]!==a)f=(R)=>{if(R==="proceed"){if(a)saveGlobalConfig(fmm);c(!0),s(d.current.signal).catch(()=>c(!1))}else i()},t[3]=i,t[4]=s,t[5]=a,t[6]=f;else f=t[6];let h=f,g;if(t[7]!==i)g=()=>{d.current.abort(),i()},t[7]=i,t[8]=g;else g=t[8];let _=g,T;if(t[9]!==n)T=n??`${Rte()} \xB7 Est. cost ${A6e()} USD`,t[9]=n,t[10]=T;else T=t[10];let y;if(t[11]===Symbol.for("react.memo_cache_sentinel"))y=Gy.jsx(Text,{dimColor:!0,children:"Loading\u2026"}),t[11]=y;else y=t[11];let S;if(t[12]!==r||t[13]!==_||t[14]!==h||t[15]!==l||t[16]!==o||t[17]!==a||t[18]!==m)S=Gy.jsx(kue.Suspense,{fallback:y,children:Gy.jsx(_mm,{showTerms:a,sourcePromise:m,body:r,scope:o,isLaunching:l,onSelect:h,onCancel:_})}),t[12]=r,t[13]=_,t[14]=h,t[15]=l,t[16]=o,t[17]=a,t[18]=m,t[19]=S;else S=t[19];let E;if(t[20]!==_||t[21]!==T||t[22]!==S)E=Gy.jsx(preInitQueue,{title:"Run ultrareview in the cloud?",subtitle:T,onCancel:_,children:S}),t[20]=_,t[21]=T,t[22]=S,t[23]=E;else E=t[23];return E}
function fmm(e){return e.hasSeenUltrareviewTerms?e:{...e,hasSeenUltrareviewTerms:!0}}
function hmm(){return null}
function gmm(){return!getGlobalConfig().hasSeenUltrareviewTerms}
function _mm(e){let t=kjn.c(17),{showTerms:n,sourcePromise:r,body:o,scope:s,isLaunching:i,onSelect:a,onCancel:l}=e,c=r?kue.use(r):null,u;if(t[0]!==c)u=c&&uIo(c),t[0]=c,t[1]=u;else u=t[1];let d=u,p=s.mode==="pr"?`Reviewing ${s.repo}#${s.prNumber} fetched from GitHub.`:s.headBranch===s.baseBranch?`Reviewing local changes on ${s.baseBranch}.`:`Reviewing ${s.headBranch} against ${s.baseBranch}.`,m=s.mode==="branch"&&s.diffStat?s.diffStat:null,f=s.mode==="pr"?"Tip: run /code-review ultra (no number) to review your current branch instead.":"Tip: run /code-review ultra <PR number> to fetch and review a specific GitHub PR instead.",h;if(t[2]!==o||t[3]!==m||t[4]!==p||t[5]!==n||t[6]!==d||t[7]!==f)h=n?Gy.jsxs(Gy.Fragment,{children:[Gy.jsxs(Box,{flexDirection:"column",children:[Gy.jsx(Text,{dimColor:!0,children:p}),m&&Gy.jsxs(Text,{dimColor:!0,children:["Scope: ",m]}),Gy.jsx(Text,{dimColor:!0,children:"Finds and verifies bugs using a multi-agent review fleet."}),Gy.jsx(Text,{dimColor:!0,children:f}),d&&Gy.jsx(Text,{dimColor:!0,children:d}),o&&Gy.jsx(Text,{dimColor:!0,children:o}),Gy.jsxs(Text,{dimColor:!0,children:["More information: ",Gy.jsx(Link,{url:WPe,children:WPe})]})]}),Gy.jsx(Text,{children:"Proceed?"})]}):Gy.jsxs(Box,{flexDirection:"column",children:[Gy.jsx(Text,{dimColor:!0,children:p}),m&&Gy.jsxs(Text,{dimColor:!0,children:["Scope: ",m]}),Gy.jsx(Text,{dimColor:!0,children:"Finds and verifies bugs using a multi-agent review fleet."}),Gy.jsx(Text,{dimColor:!0,children:f}),o&&Gy.jsx(Text,{dimColor:!0,children:o})]}),t[2]=o,t[3]=m,t[4]=p,t[5]=n,t[6]=d,t[7]=f,t[8]=h;else h=t[8];let g;if(t[9]!==i||t[10]!==l||t[11]!==a||t[12]!==n)g=i?Gy.jsx(ymm,{}):Gy.jsx(hr,{options:[{label:n?"Yes":"Run ultrareview",value:"proceed",description:"launch in Claude Code on the web"},{label:n?"No":"Not now",value:"cancel"}],onChange:a,onCancel:l}),t[9]=i,t[10]=l,t[11]=a,t[12]=n,t[13]=g;else g=t[13];let _;if(t[14]!==h||t[15]!==g)_=Gy.jsxs(Box,{flexDirection:"column",gap:1,children:[h,g]}),t[14]=h,t[15]=g,t[16]=_;else _=t[16];return _}
function ymm(){let e=kjn.c(12),t=ay(),n;if(e[0]!==t.prefersReducedMotion)n=MA(t.prefersReducedMotion),e[0]=t.prefersReducedMotion,e[1]=n;else n=e[1];let r=n,[o,s]=useAnimationFrame(r?null:50),i=r?-100:19-Math.floor(s/200)%29,a=Math.floor(s/120),l;if(e[2]!==a||e[3]!==r||e[4]!==s)l=Gy.jsx(A0e,{frame:a,messageColor:"inactive",reducedMotion:r,time:s}),e[2]=a,e[3]=r,e[4]=s,e[5]=l;else l=e[5];let c;if(e[6]!==i)c=Gy.jsx(Y$t,{message:"Launching",mode:"responding",messageColor:"inactive",glimmerIndex:i,flashOpacity:0,shimmerColor:"subtle"}),e[6]=i,e[7]=c;else c=e[7];let u;if(e[8]!==o||e[9]!==l||e[10]!==c)u=Gy.jsxs(Box,{ref:o,flexDirection:"row",columnGap:1,children:[l,c]}),e[8]=o,e[9]=l,e[10]=c,e[11]=u;else u=e[11];return u}
var kjn,kue,Gy;
var rIl=b(()=>{Ol();di();A2n();J$t();dIo();zR();E$();je();Rjn();tr();qZ();OWe();bGt();kjn=x(tt(),1),kue=x(et(),1),Gy=x(oe(),1)});
export {nIl,fmm,hmm,gmm,_mm,ymm,kjn,kue,Gy,rIl};
