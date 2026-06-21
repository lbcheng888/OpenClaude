// @ts-nocheck
import {AI,Mce} from "./m4173.ts";
import {Uu,zd,Cn,dr} from "./m231.ts";
import {lLt,Oz} from "./m2799.ts";
import {K9n,Y6a,ydo} from "./m4188.ts";
import {Gn,sc} from "./m2455.ts";
import {Y9n,J9n} from "./m4190.ts";
import {eja,Sdo} from "./m4189.ts";
import {Text} from "./m2423.ts";
import {Bs,rA} from "./m2550.ts";
import {Box} from "./m2422.ts";
import {XR,configProtoStore} from "./m2458.ts";
import {formatDuration,formatTokens,ps} from "./m238.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function aja(e,{verbose:t}){if(e.name)return`dynamic workflow: ${e.name}`;if(!e.script)return null;if(t)return e.script;let n=AI(e.script);if(!("error"in n))return n.meta.description;let r=e.script.split(`
`).find((a)=>a.trim())??e.script.slice(0,40),o=r.length>ija?r.slice(0,ija-1)+"\u2026":r,s=Uu(e.script,`
`)+1,i=lLt(s-1);return i?`${o} ${i}`:o}
function lja(e,t){let n=K9n(e.map((o)=>o.data));if(n.agents.length===0&&n.logs.length===0)return null;let r=Boolean(t?.verbose||t?.isTranscriptMode);if(r){let o=t?.terminalSize?.columns??80,s=Math.min(80,Math.max(40,o-10));return xc.createElement(Gn,null,xc.createElement(Y6a,{collected:n,verbose:r,width:s}))}return xc.createElement(Gn,null,xc.createElement(N0p,{agents:n.agents}))}
function N0p(e){let t=Edo.c(8),{agents:n}=e,r;if(t[0]!==n)r=Y9n(n),t[0]=n,t[1]=r;else r=t[1];let{done:o,failedCount:s,running:i,total:a,complete:l}=r,c=s>0?"failed":l?"done":"running",u;if(t[2]!==l||t[3]!==o||t[4]!==c||t[5]!==i||t[6]!==a)u=xc.createElement(eja,{done:o,total:a,running:i,complete:l,dotState:c}),t[2]=l,t[3]=o,t[4]=c,t[5]=i,t[6]=a,t[7]=u;else u=t[7];return u}
function cja(e){if(e.error)return xc.createElement(Gn,null,xc.createElement(Text,{color:"error"},xc.createElement(Bs,{status:"error",withSpace:!0}),zd(e.error)));if(e.status==="remote_launched")return xc.createElement(Gn,null,xc.createElement(Box,{flexDirection:"column"},xc.createElement(Text,null,xc.createElement(Text,{dimColor:!0},"Running in cloud session \xB7 "),xc.createElement(Text,{color:"suggestion"},e.sessionUrl)),e.warning?xc.createElement(Text,{color:"warning"},xc.createElement(Bs,{status:"warning",withSpace:!0}),e.warning):null));return xc.createElement(B0p,{taskId:e.taskId})}
function B0p(e){let t=Edo.c(21),{taskId:n}=e,r;if(t[0]!==n)r=(i)=>i.tasks[n],t[0]=n,t[1]=r;else r=t[1];let o=XR(r);if(o?.type==="local_workflow"&&(o.status==="completed"||o.status==="failed"||o.status==="killed")){let i;if(t[2]!==o.endTime||t[3]!==o.startTime)i=o.endTime&&o.startTime?formatDuration(o.endTime-o.startTime):void 0,t[2]=o.endTime,t[3]=o.startTime,t[4]=i;else i=t[4];let a=i,l=o.status==="failed",c=o.status==="killed",u=l||c?"error":"success",d;if(t[5]!==u)d=xc.createElement(Bs,{status:u,withSpace:!0}),t[5]=u,t[6]=d;else d=t[6];let p=l?"Failed":c?"Stopped":"Completed",m=a&&` in ${a}`,f;if(t[7]!==o.agentCount)f=o.agentCount>0&&` \xB7 ${o.agentCount} ${Cn(o.agentCount,"agent")}`,t[7]=o.agentCount,t[8]=f;else f=t[8];let A;if(t[9]!==o.totalTokens)A=o.totalTokens>0&&` \xB7 ${formatTokens(o.totalTokens)} tokens`,t[9]=o.totalTokens,t[10]=A;else A=t[10];let h;if(t[11]!==p||t[12]!==m||t[13]!==f||t[14]!==A)h=xc.createElement(Text,{dimColor:!0},p,m,f,A),t[11]=p,t[12]=m,t[13]=f,t[14]=A,t[15]=h;else h=t[15];let g;if(t[16]!==d||t[17]!==h)g=xc.createElement(Gn,null,xc.createElement(Text,null,d,h)),t[16]=d,t[17]=h,t[18]=g;else g=t[18];return g}if(o?.type==="local_workflow"){let i;if(t[19]===Symbol.for("react.memo_cache_sentinel"))i=xc.createElement(Gn,null,xc.createElement(Text,null,xc.createElement(Text,{dimColor:!0},"Running in background \xB7 "),xc.createElement(Text,{color:"suggestion"},"/workflows"),xc.createElement(Text,{dimColor:!0}," to monitor and save"))),t[19]=i;else i=t[19];return i}let s;if(t[20]===Symbol.for("react.memo_cache_sentinel"))s=xc.createElement(Gn,null,xc.createElement(Text,null,xc.createElement(Text,{color:"suggestion"},"/workflows"),xc.createElement(Text,{dimColor:!0}," to view dynamic workflow runs"))),t[20]=s;else s=t[20];return s}
function uja(){return xc.createElement(Gn,null,xc.createElement(Text,{dimColor:!0},"Dynamic workflow cancelled"))}
var Edo,xc,ija=80;
var dja=b(()=>{Oz();rA();sc();ze();configProtoStore();ps();dr();ydo();Mce();Sdo();J9n();Edo=M(rt(),1),xc=M(Te(),1)});
export {aja,lja,N0p,cja,B0p,uja,Edo,xc,ija,dja};
