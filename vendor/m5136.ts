// @ts-nocheck
import {_t,uo} from "./m2468.ts";
import {useInterval} from "./m2456.ts";
import {formatDuration,formatTokens,Xo} from "./m240.ts";
import {getTotalOutputTokens,lt} from "../src/session/0132_sent.ts";
import {Sn,Cd,lr} from "./m233.ts";
import {bn,Is} from "./m2565.ts";
import {Text} from "./m2433.ts";
import {at,Wo} from "./m2557.ts";
import {Box} from "./m2432.ts";
import {preInitQueue,di} from "./m2583.ts";
import {Fon,Pa} from "./m720.ts";
import {lsl,p8e} from "../src/telemetry/4398_condition.ts";
import {bs,ff} from "./m2561.ts";
import {wl,sy} from "./m2585.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function e2l(e){let t=GDo.c(39),{messages:n,onDone:r}=e,o=_t(JCm),[,s]=ZUl.useState(0),i;if(t[0]!==s)i=()=>s(YCm),t[0]=s,t[1]=i;else i=t[1];if(useInterval(i,o?1000:null),o){let d=Date.now()-o.setAt,p;if(t[2]!==d)p=formatDuration(d,{mostSignificantOnly:!0}),t[2]=d,t[3]=p;else p=t[3];let m=p,f=getTotalOutputTokens()-o.tokensAtStart,h;if(t[4]!==f)h=formatTokens(f),t[4]=f,t[5]=h;else h=t[5];let g=h,_=`running ${m}`,T;if(t[6]!==o.iterations)T=o.iterations>0&&`${o.iterations} ${Sn(o.iterations,"turn")}`,t[6]=o.iterations,t[7]=T;else T=t[7];let y=`${g} tokens`,S;if(t[8]!==_||t[9]!==T||t[10]!==y)S=[_,T,y].filter(Boolean),t[8]=_,t[9]=T,t[10]=y,t[11]=S;else S=t[11];let R=S.join(" \xB7 "),w;if(t[12]===Symbol.for("react.memo_cache_sentinel"))w=Tv.jsxs(bn,{children:[Tv.jsx(Text,{children:"/goal clear to stop early"}),Tv.jsx(at,{chord:"escape",action:"dismiss"})]}),t[12]=w;else w=t[12];let H;if(t[13]!==o.condition)H=Tv.jsx(WDo,{label:"Goal",children:o.condition}),t[13]=o.condition,t[14]=H;else H=t[14];let k;if(t[15]!==o.lastReason)k=o.lastReason?Tv.jsx(WDo,{label:"Last check",children:Cd(o.lastReason.trim())}):null,t[15]=o.lastReason,t[16]=k;else k=t[16];let I;if(t[17]!==H||t[18]!==k)I=Tv.jsxs(Box,{flexDirection:"column",children:[H,k]}),t[17]=H,t[18]=k,t[19]=I;else I=t[19];let D;if(t[20]!==r||t[21]!==R||t[22]!==I)D=Tv.jsx(preInitQueue,{title:`${Fon} Goal active`,subtitle:R,onCancel:r,inputGuide:w,children:I}),t[20]=r,t[21]=R,t[22]=I,t[23]=D;else D=t[23];return D}let a;if(t[24]!==n||t[25]!==r){a=Symbol.for("react.early_return_sentinel");e:{let d=lsl(n);if(d){let p=[];if(d.durationMs!==void 0)p.push(formatDuration(d.durationMs,{mostSignificantOnly:!0}));if(d.iterations!==void 0)p.push(`${d.iterations} ${Sn(d.iterations,"turn")}`);if(d.tokens!==void 0)p.push(`${formatTokens(d.tokens)} tokens`);let m;if(t[27]===Symbol.for("react.memo_cache_sentinel"))m=Tv.jsxs(Text,{children:[Tv.jsx(bs,{status:"success",withSpace:!0}),"Goal achieved"]}),t[27]=m;else m=t[27];let f=p.join(" \xB7 "),h;if(t[28]===Symbol.for("react.memo_cache_sentinel"))h=Tv.jsxs(bn,{children:[Tv.jsx(Text,{children:"/goal <condition> to set another"}),Tv.jsx(at,{chord:"escape",action:"dismiss"})]}),t[28]=h;else h=t[28];let g;if(t[29]!==d)g=Tv.jsx(WDo,{label:"Goal",children:d.condition}),t[29]=d,t[30]=g;else g=t[30];let _;if(t[31]!==r||t[32]!==f||t[33]!==g)_=Tv.jsx(preInitQueue,{title:m,subtitle:f,color:"success",onCancel:r,inputGuide:h,children:g}),t[31]=r,t[32]=f,t[33]=g,t[34]=_;else _=t[34];a=_;break e}}t[24]=n,t[25]=r,t[26]=a}else a=t[26];if(a!==Symbol.for("react.early_return_sentinel"))return a;let l,c;if(t[35]===Symbol.for("react.memo_cache_sentinel"))l=Tv.jsx(at,{chord:"escape",action:"dismiss"}),c=Tv.jsx(wl,{hint:"/goal <condition> to set one",children:"No goal set"}),t[35]=l,t[36]=c;else l=t[35],c=t[36];let u;if(t[37]!==r)u=Tv.jsx(preInitQueue,{title:"Goal",onCancel:r,inputGuide:l,children:c}),t[37]=r,t[38]=u;else u=t[38];return u}
function YCm(e){return e+1}
function JCm(e){return e.activeGoal}
function WDo(e){let t=GDo.c(7),{label:n,children:r}=e,o;if(t[0]!==n)o=Tv.jsx(Box,{flexShrink:0,children:Tv.jsxs(Text,{dimColor:!0,children:[n,": "]})}),t[0]=n,t[1]=o;else o=t[1];let s;if(t[2]!==r)s=Tv.jsx(Box,{flexGrow:1,children:Tv.jsx(Text,{wrap:"wrap",children:r})}),t[2]=r,t[3]=s;else s=t[3];let i;if(t[4]!==o||t[5]!==s)i=Tv.jsxs(Box,{flexDirection:"row",children:[o,s]}),t[4]=o,t[5]=s,t[6]=i;else i=t[6];return i}
var GDo,ZUl,Tv;
var t2l=b(()=>{lt();Is();di();sy();Wo();ff();Pa();je();uo();Xo();lr();p8e();GDo=x(tt(),1),ZUl=x(et(),1),Tv=x(oe(),1)});
export {e2l,YCm,JCm,WDo,GDo,ZUl,Tv,t2l};
