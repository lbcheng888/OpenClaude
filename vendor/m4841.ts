// @ts-nocheck
import {ug,ZR} from "./m2551.ts";
import {Zmt,MGn} from "../src/telemetry/4834_cloneViable.ts";
import {saveGlobalConfig,getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {wte,G4e} from "../src/config/3923_maxFiles.ts";
import {Text} from "./m2423.ts";
import {Kn,Li} from "./m2572.ts";
import {GCo,VCo} from "../src/tui/4841_sourcePromise.ts";
import {Box} from "./m2422.ts";
import {Link} from "./m2427.ts";
import {WDe,t8e} from "../src/permissions/4840_plan.ts";
import {pr,Yl} from "./m2562.ts";
import {sy,e9} from "./m2808.ts";
import {Dv,VZ} from "../src/telemetry/2527_VZ.ts";
import {useAnimationFrame} from "../src/config/2442_isVisible.ts";
import {MHe,SUt} from "./m3829.ts";
import {TUt,HBn} from "./m3828.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Qjt} from "../src/session/4833_flags.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function YSl(e){let t=FGn.c(24),{subtitle:n,body:r,scope:o,onProceed:s,onCancel:i}=e;ug("ultrareview-launch");let[a]=dA.useState(rom),[l,c]=dA.useState(!1),u;if(t[0]===Symbol.for("react.memo_cache_sentinel"))u=new AbortController,t[0]=u;else u=t[0];let d=dA.useRef(u),p;if(t[1]!==a)p=()=>a?Zmt().catch(nom):null,t[1]=a,t[2]=p;else p=t[2];let[m]=dA.useState(p),f;if(t[3]!==i||t[4]!==s||t[5]!==a)f=(v)=>{if(v==="proceed"){if(a)saveGlobalConfig(tom);c(!0),s(d.current.signal).catch(()=>c(!1))}else i()},t[3]=i,t[4]=s,t[5]=a,t[6]=f;else f=t[6];let A=f,h;if(t[7]!==i)h=()=>{d.current.abort(),i()},t[7]=i,t[8]=h;else h=t[8];let g=h,_;if(t[9]!==n)_=n??`${wte()} \xB7 Est. cost ${G4e()} USD`,t[9]=n,t[10]=_;else _=t[10];let y;if(t[11]===Symbol.for("react.memo_cache_sentinel"))y=dA.default.createElement(Text,{dimColor:!0},"Loading\u2026"),t[11]=y;else y=t[11];let T;if(t[12]!==r||t[13]!==g||t[14]!==A||t[15]!==l||t[16]!==o||t[17]!==a||t[18]!==m)T=dA.default.createElement(dA.Suspense,{fallback:y},dA.default.createElement(oom,{showTerms:a,sourcePromise:m,body:r,scope:o,isLaunching:l,onSelect:A,onCancel:g})),t[12]=r,t[13]=g,t[14]=A,t[15]=l,t[16]=o,t[17]=a,t[18]=m,t[19]=T;else T=t[19];let S;if(t[20]!==g||t[21]!==_||t[22]!==T)S=dA.default.createElement(Kn,{title:"Run ultrareview in the cloud?",subtitle:_,onCancel:g},T),t[20]=g,t[21]=_,t[22]=T,t[23]=S;else S=t[23];return S}
function tom(e){return e.hasSeenUltrareviewTerms?e:{...e,hasSeenUltrareviewTerms:!0}}
function nom(){return null}
function rom(){return!getGlobalConfig().hasSeenUltrareviewTerms}
function oom(e){let t=FGn.c(17),{showTerms:n,sourcePromise:r,body:o,scope:s,isLaunching:i,onSelect:a,onCancel:l}=e,c=r?dA.use(r):null,u;if(t[0]!==c)u=c&&GCo(c),t[0]=c,t[1]=u;else u=t[1];let d=u,p=s.mode==="pr"?`Reviewing ${s.repo}#${s.prNumber} fetched from GitHub.`:s.headBranch===s.baseBranch?`Reviewing local changes on ${s.baseBranch}.`:`Reviewing ${s.headBranch} against ${s.baseBranch}.`,m=s.mode==="branch"&&s.diffStat?s.diffStat:null,f=s.mode==="pr"?"Tip: run /code-review ultra (no number) to review your current branch instead.":"Tip: run /code-review ultra <PR number> to fetch and review a specific GitHub PR instead.",A;if(t[2]!==o||t[3]!==m||t[4]!==p||t[5]!==n||t[6]!==d||t[7]!==f)A=n?dA.default.createElement(dA.default.Fragment,null,dA.default.createElement(Box,{flexDirection:"column"},dA.default.createElement(Text,{dimColor:!0},p),m&&dA.default.createElement(Text,{dimColor:!0},"Scope: ",m),dA.default.createElement(Text,{dimColor:!0},"Finds and verifies bugs using a multi-agent review fleet."),dA.default.createElement(Text,{dimColor:!0},f),d&&dA.default.createElement(Text,{dimColor:!0},d),o&&dA.default.createElement(Text,{dimColor:!0},o),dA.default.createElement(Text,{dimColor:!0},"More information: ",dA.default.createElement(Link,{url:WDe},WDe))),dA.default.createElement(Text,null,"Proceed?")):dA.default.createElement(Box,{flexDirection:"column"},dA.default.createElement(Text,{dimColor:!0},p),m&&dA.default.createElement(Text,{dimColor:!0},"Scope: ",m),dA.default.createElement(Text,{dimColor:!0},"Finds and verifies bugs using a multi-agent review fleet."),dA.default.createElement(Text,{dimColor:!0},f),o&&dA.default.createElement(Text,{dimColor:!0},o)),t[2]=o,t[3]=m,t[4]=p,t[5]=n,t[6]=d,t[7]=f,t[8]=A;else A=t[8];let h;if(t[9]!==i||t[10]!==l||t[11]!==a||t[12]!==n)h=i?dA.default.createElement(som,null):dA.default.createElement(pr,{options:[{label:n?"Yes":"Run ultrareview",value:"proceed",description:"launch in Claude Code on the web"},{label:n?"No":"Not now",value:"cancel"}],onChange:a,onCancel:l}),t[9]=i,t[10]=l,t[11]=a,t[12]=n,t[13]=h;else h=t[13];let g;if(t[14]!==A||t[15]!==h)g=dA.default.createElement(Box,{flexDirection:"column",gap:1},A,h),t[14]=A,t[15]=h,t[16]=g;else g=t[16];return g}
function som(){let e=FGn.c(12),t=sy(),n;if(e[0]!==t.prefersReducedMotion)n=Dv(t.prefersReducedMotion),e[0]=t.prefersReducedMotion,e[1]=n;else n=e[1];let r=n,[o,s]=useAnimationFrame(r?null:50),i=r?-100:19-Math.floor(s/200)%29,a=Math.floor(s/120),l;if(e[2]!==a||e[3]!==r||e[4]!==s)l=dA.default.createElement(MHe,{frame:a,messageColor:"inactive",reducedMotion:r,time:s}),e[2]=a,e[3]=r,e[4]=s,e[5]=l;else l=e[5];let c;if(e[6]!==i)c=dA.default.createElement(TUt,{message:"Launching",mode:"responding",messageColor:"inactive",glimmerIndex:i,flashOpacity:0,shimmerColor:"subtle"}),e[6]=i,e[7]=c;else c=e[7];let u;if(e[8]!==o||e[9]!==l||e[10]!==c)u=dA.default.createElement(Box,{ref:o,flexDirection:"row",columnGap:1},l,c),e[8]=o,e[9]=l,e[10]=c,e[11]=u;else u=e[11];return u}
var FGn,dA;
var JSl=b(()=>{Yl();Li();HBn();SUt();VCo();ZR();e9();ze();MGn();Qn();VZ();t8e();Qjt();FGn=M(rt(),1),dA=M(Te(),1)});
export {YSl,tom,nom,rom,oom,som,FGn,dA,JSl};
