// @ts-nocheck
import {mt,configProtoStore} from "./m2458.ts";
import {useInterval} from "./m2446.ts";
import {formatDuration,formatTokens,ps} from "./m238.ts";
import {getTotalOutputTokens,lt} from "../src/session/0131_sent.ts";
import {Cn,zd,dr} from "./m231.ts";
import {Tn,zs} from "./m2554.ts";
import {Text} from "./m2423.ts";
import {at,rs} from "./m2546.ts";
import {Box} from "./m2422.ts";
import {Kn,Li} from "./m2572.ts";
import {rnn,sl} from "./m715.ts";
import {vQa,F6e} from "../src/telemetry/4376_condition.ts";
import {Bs,rA} from "./m2550.ts";
import {ic,Ny} from "./m2574.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function vPl(e){let t=Mxo.c(39),{messages:n,onDone:r}=e,o=mt(Ffm),[,s]=nw.useState(0),i;if(t[0]!==s)i=()=>s(Bfm),t[0]=s,t[1]=i;else i=t[1];if(useInterval(i,o?1000:null),o){let d=Date.now()-o.setAt,p;if(t[2]!==d)p=formatDuration(d,{mostSignificantOnly:!0}),t[2]=d,t[3]=p;else p=t[3];let m=p,f=getTotalOutputTokens()-o.tokensAtStart,A;if(t[4]!==f)A=formatTokens(f),t[4]=f,t[5]=A;else A=t[5];let h=A,g=`running ${m}`,_;if(t[6]!==o.iterations)_=o.iterations>0&&`${o.iterations} ${Cn(o.iterations,"turn")}`,t[6]=o.iterations,t[7]=_;else _=t[7];let y=`${h} tokens`,T;if(t[8]!==g||t[9]!==_||t[10]!==y)T=[g,_,y].filter(Boolean),t[8]=g,t[9]=_,t[10]=y,t[11]=T;else T=t[11];let v=T.join(" \xB7 "),R;if(t[12]===Symbol.for("react.memo_cache_sentinel"))R=nw.default.createElement(Tn,null,nw.default.createElement(Text,null,"/goal clear to stop early"),nw.default.createElement(at,{chord:"escape",action:"dismiss"})),t[12]=R;else R=t[12];let k;if(t[13]!==o.condition)k=nw.default.createElement(Lxo,{label:"Goal"},o.condition),t[13]=o.condition,t[14]=k;else k=t[14];let x;if(t[15]!==o.lastReason)x=o.lastReason?nw.default.createElement(Lxo,{label:"Last check"},zd(o.lastReason.trim())):null,t[15]=o.lastReason,t[16]=x;else x=t[16];let H;if(t[17]!==k||t[18]!==x)H=nw.default.createElement(Box,{flexDirection:"column"},k,x),t[17]=k,t[18]=x,t[19]=H;else H=t[19];let I;if(t[20]!==r||t[21]!==v||t[22]!==H)I=nw.default.createElement(Kn,{title:`${rnn} Goal active`,subtitle:v,onCancel:r,inputGuide:R},H),t[20]=r,t[21]=v,t[22]=H,t[23]=I;else I=t[23];return I}let a;if(t[24]!==n||t[25]!==r){a=Symbol.for("react.early_return_sentinel");e:{let d=vQa(n);if(d){let p=[];if(d.durationMs!==void 0)p.push(formatDuration(d.durationMs,{mostSignificantOnly:!0}));if(d.iterations!==void 0)p.push(`${d.iterations} ${Cn(d.iterations,"turn")}`);if(d.tokens!==void 0)p.push(`${formatTokens(d.tokens)} tokens`);let m;if(t[27]===Symbol.for("react.memo_cache_sentinel"))m=nw.default.createElement(Text,null,nw.default.createElement(Bs,{status:"success",withSpace:!0}),"Goal achieved"),t[27]=m;else m=t[27];let f=p.join(" \xB7 "),A;if(t[28]===Symbol.for("react.memo_cache_sentinel"))A=nw.default.createElement(Tn,null,nw.default.createElement(Text,null,"/goal <condition> to set another"),nw.default.createElement(at,{chord:"escape",action:"dismiss"})),t[28]=A;else A=t[28];let h;if(t[29]!==d)h=nw.default.createElement(Lxo,{label:"Goal"},d.condition),t[29]=d,t[30]=h;else h=t[30];let g;if(t[31]!==r||t[32]!==f||t[33]!==h)g=nw.default.createElement(Kn,{title:m,subtitle:f,color:"success",onCancel:r,inputGuide:A},h),t[31]=r,t[32]=f,t[33]=h,t[34]=g;else g=t[34];a=g;break e}}t[24]=n,t[25]=r,t[26]=a}else a=t[26];if(a!==Symbol.for("react.early_return_sentinel"))return a;let l,c;if(t[35]===Symbol.for("react.memo_cache_sentinel"))l=nw.default.createElement(at,{chord:"escape",action:"dismiss"}),c=nw.default.createElement(ic,{hint:"/goal <condition> to set one"},"No goal set"),t[35]=l,t[36]=c;else l=t[35],c=t[36];let u;if(t[37]!==r)u=nw.default.createElement(Kn,{title:"Goal",onCancel:r,inputGuide:l},c),t[37]=r,t[38]=u;else u=t[38];return u}
function Bfm(e){return e+1}
function Ffm(e){return e.activeGoal}
function Lxo(e){let t=Mxo.c(7),{label:n,children:r}=e,o;if(t[0]!==n)o=nw.default.createElement(Box,{flexShrink:0},nw.default.createElement(Text,{dimColor:!0},n,": ")),t[0]=n,t[1]=o;else o=t[1];let s;if(t[2]!==r)s=nw.default.createElement(Box,{flexGrow:1},nw.default.createElement(Text,{wrap:"wrap"},r)),t[2]=r,t[3]=s;else s=t[3];let i;if(t[4]!==o||t[5]!==s)i=nw.default.createElement(Box,{flexDirection:"row"},o,s),t[4]=o,t[5]=s,t[6]=i;else i=t[6];return i}
var Mxo,nw;
var wPl=b(()=>{lt();zs();Li();Ny();rs();rA();sl();ze();configProtoStore();ps();dr();F6e();Mxo=M(rt(),1),nw=M(Te(),1)});
export {vPl,Bfm,Ffm,Lxo,Mxo,nw,wPl};
