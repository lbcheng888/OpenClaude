// @ts-nocheck
import {Bw,Nte} from "./m4186.ts";
import {nu,Cd,Sn,lr} from "./m233.ts";
import {N1t,uj} from "./m2812.ts";
import {zqn,o7a,dgo} from "./m4203.ts";
import {Yn,Pl} from "./m2465.ts";
import {Yqn,Jqn} from "./m4205.ts";
import {c7a,mgo} from "./m4204.ts";
import {Text} from "./m2433.ts";
import {bs,ff} from "./m2561.ts";
import {Box} from "./m2432.ts";
import {cw,uo} from "./m2468.ts";
import {formatDuration,formatTokens,Xo} from "./m240.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function g7a(e,{verbose:t}){if(e.name)return`dynamic workflow: ${e.name}`;if(!e.script)return null;if(t)return e.script;let n=Bw(e.script);if(!("error"in n))return n.meta.description;let r=e.script.split(`
`).find((a)=>a.trim())??e.script.slice(0,40),o=r.length>h7a?r.slice(0,h7a-1)+"\u2026":r,s=nu(e.script,`
`)+1,i=N1t(s-1);return i?`${o} ${i}`:o}
function _7a(e,t){let n=zqn(e.map((o)=>o.data));if(n.agents.length===0&&n.logs.length===0)return null;let r=Boolean(t?.verbose||t?.isTranscriptMode);if(r){let o=t?.terminalSize?.columns??80,s=Math.min(80,Math.max(40,o-10));return N_.jsx(Yn,{children:N_.jsx(o7a,{collected:n,verbose:r,width:s})})}return N_.jsx(Yn,{children:N_.jsx(tBp,{agents:n.agents})})}
function tBp(e){let t=hgo.c(8),{agents:n}=e,r;if(t[0]!==n)r=Yqn(n),t[0]=n,t[1]=r;else r=t[1];let{done:o,failedCount:s,running:i,total:a,complete:l}=r,c=s>0?"failed":l?"done":"running",u;if(t[2]!==l||t[3]!==o||t[4]!==c||t[5]!==i||t[6]!==a)u=N_.jsx(c7a,{done:o,total:a,running:i,complete:l,dotState:c}),t[2]=l,t[3]=o,t[4]=c,t[5]=i,t[6]=a,t[7]=u;else u=t[7];return u}
function y7a(e){if(e.error)return N_.jsx(Yn,{children:N_.jsxs(Text,{color:"error",children:[N_.jsx(bs,{status:"error",withSpace:!0}),Cd(e.error)]})});if(e.status==="remote_launched")return N_.jsx(Yn,{children:N_.jsxs(Box,{flexDirection:"column",children:[N_.jsxs(Text,{children:[N_.jsx(Text,{dimColor:!0,children:"Running in cloud session \xB7 "}),N_.jsx(Text,{color:"suggestion",children:e.sessionUrl})]}),e.warning?N_.jsxs(Text,{color:"warning",children:[N_.jsx(bs,{status:"warning",withSpace:!0}),e.warning]}):null]})});return N_.jsx(nBp,{taskId:e.taskId})}
function nBp(e){let t=hgo.c(21),{taskId:n}=e,r;if(t[0]!==n)r=(i)=>i.tasks[n],t[0]=n,t[1]=r;else r=t[1];let o=cw(r);if(o?.type==="local_workflow"&&(o.status==="completed"||o.status==="failed"||o.status==="killed")){let i;if(t[2]!==o.endTime||t[3]!==o.startTime)i=o.endTime&&o.startTime?formatDuration(o.endTime-o.startTime):void 0,t[2]=o.endTime,t[3]=o.startTime,t[4]=i;else i=t[4];let a=i,l=o.status==="failed",c=o.status==="killed",u=l||c?"error":"success",d;if(t[5]!==u)d=N_.jsx(bs,{status:u,withSpace:!0}),t[5]=u,t[6]=d;else d=t[6];let p=l?"Failed":c?"Stopped":"Completed",m=a&&` in ${a}`,f;if(t[7]!==o.agentCount)f=o.agentCount>0&&` \xB7 ${o.agentCount} ${Sn(o.agentCount,"agent")}`,t[7]=o.agentCount,t[8]=f;else f=t[8];let h;if(t[9]!==o.totalTokens)h=o.totalTokens>0&&` \xB7 ${formatTokens(o.totalTokens)} tokens`,t[9]=o.totalTokens,t[10]=h;else h=t[10];let g;if(t[11]!==p||t[12]!==m||t[13]!==f||t[14]!==h)g=N_.jsxs(Text,{dimColor:!0,children:[p,m,f,h]}),t[11]=p,t[12]=m,t[13]=f,t[14]=h,t[15]=g;else g=t[15];let _;if(t[16]!==d||t[17]!==g)_=N_.jsx(Yn,{children:N_.jsxs(Text,{children:[d,g]})}),t[16]=d,t[17]=g,t[18]=_;else _=t[18];return _}if(o?.type==="local_workflow"){let i;if(t[19]===Symbol.for("react.memo_cache_sentinel"))i=N_.jsx(Yn,{children:N_.jsxs(Text,{children:[N_.jsx(Text,{dimColor:!0,children:"Running in background \xB7 "}),N_.jsx(Text,{color:"suggestion",children:"/workflows"}),N_.jsx(Text,{dimColor:!0,children:" to monitor and save"})]})}),t[19]=i;else i=t[19];return i}let s;if(t[20]===Symbol.for("react.memo_cache_sentinel"))s=N_.jsx(Yn,{children:N_.jsxs(Text,{children:[N_.jsx(Text,{color:"suggestion",children:"/workflows"}),N_.jsx(Text,{dimColor:!0,children:" to view dynamic workflow runs"})]})}),t[20]=s;else s=t[20];return s}
function T7a(){return N_.jsx(Yn,{children:N_.jsx(Text,{dimColor:!0,children:"Dynamic workflow cancelled"})})}
var hgo,N_,h7a=80;
var S7a=b(()=>{uj();ff();Pl();je();uo();Xo();lr();dgo();Nte();mgo();Jqn();hgo=x(tt(),1),N_=x(oe(),1)});
export {g7a,_7a,tBp,y7a,nBp,T7a,hgo,N_,h7a,S7a};
