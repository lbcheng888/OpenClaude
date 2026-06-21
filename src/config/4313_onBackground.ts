// @ts-nocheck
import {mcpTools,sJ} from "../../vendor/m4311.ts";
import {y6e,eJ} from "../../vendor/m4342.ts";
import {m0n,KYr} from "../../vendor/m3285.ts";
import {ju,wk} from "../tui/2564_current.ts";
import {je} from "../../vendor/m577.ts";
import {Box} from "../../vendor/m2422.ts";
import {Text} from "../../vendor/m2423.ts";
import {at,rs} from "../../vendor/m2546.ts";
import {kqe,F$t} from "../../vendor/m4056.ts";
import {Id,mc} from "./0645_maxBytes.ts";
import {Ms,Pp} from "./2273_loggedTmuxCcDisable.ts";
import {GRn} from "../../vendor/m2785.ts";
import {Gn,sc} from "../../vendor/m2455.ts";
import {Got,p0n} from "../../vendor/m3284.ts";
import {uqe,KUn} from "../../vendor/m3987.ts";
import {wC,jq} from "../tui/3282_result.tsx";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {Lr} from "../../vendor/m578.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function n0e(e){let t=eza.c(10),n;if(t[0]!==e)n=e===void 0?{}:e,t[0]=e,t[1]=n;else n=t[1];let{onBackground:r}=n,o=mcpTools(),s;if(t[2]!==r||t[3]!==o)s=()=>{y6e(o),r?.()},t[2]=r,t[3]=o,t[4]=s;else s=t[4];let i=s,a;if(t[5]!==i)a={handler:i,isActive:!0},t[5]=i,t[6]=a;else a=t[6];let{cohesionFixes:l,gateOnShortcut:c}=m0n(a),u=ju("task:background","Task","ctrl+b"),d=l?c:je.terminal==="tmux"&&u==="ctrl+b"?"ctrl+b ctrl+b (twice)":u;if(je.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS||l&&d==="")return null;let p;if(t[7]===Symbol.for("react.memo_cache_sentinel"))p={keyCase:"lower"},t[7]=p;else p=t[7];let m;if(t[8]!==d)m=Cx.createElement(Box,{paddingLeft:5},Cx.createElement(Text,{dimColor:!0},Cx.createElement(at,{chord:d,action:"run in background",parens:!0,format:p}))),t[8]=d,t[9]=m;else m=t[9];return m}
function tza(e,{verbose:t,theme:n}){let{command:r}=e;if(!r)return null;let o=kqe(r);if(o)return t?o.filePath:Id(o.filePath);if(!t){let s=r.split(`
`);if(Ms()){let l=GRn(r);if(l)return l.length>K3t?l.slice(0,K3t)+"\u2026":l}let i=s.length>ZKa,a=r.length>K3t;if(i||a){let l=r;if(i)l=s.slice(0,ZKa).join(`
`);if(l.length>K3t)l=l.slice(0,K3t);return Cx.createElement(Text,null,l.trim(),"\u2026")}}return r}
function nza(e,{verbose:t,tools:n,terminalSize:r,inProgressToolCallCount:o}){let s=e.at(-1);if(!s||!s.data)return Cx.createElement(Gn,{height:1},Cx.createElement(Text,{dimColor:!0},"Running\u2026"));let i=s.data;return Cx.createElement(Got,{fullOutput:i.fullOutput,output:i.output,elapsedTimeSeconds:i.elapsedTimeSeconds,totalLines:i.totalLines,totalBytes:i.totalBytes,timeoutMs:i.timeoutMs,taskId:i.taskId,verbose:t})}
function rza(){return Cx.createElement(Gn,{height:1},Cx.createElement(Text,{dimColor:!0},"Waiting\u2026"))}
function oza(e,t,{verbose:n,theme:r,tools:o,style:s}){let a=t.at(-1)?.data?.timeoutMs;return Cx.createElement(uqe,{content:e,verbose:n,timeoutMs:a})}
function sza(e,{verbose:t,progressMessagesForMessage:n,tools:r}){return Cx.createElement(wC,{result:e,verbose:t})}
var eza,Cx,ZKa=2,K3t=160;
var s3t=b(()=>{rs();jq();sc();p0n();KYr();ze();wk();sJ();eJ();Lr();mc();Pp();KUn();F$t();eza=M(rt(),1),Cx=M(Te(),1)});
export {n0e,tza,nza,rza,oza,sza,eza,Cx,ZKa,K3t,s3t};
