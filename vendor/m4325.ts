// @ts-nocheck
import {Text} from "./m2423.ts";
import {Gn,sc} from "./m2455.ts";
import {Got,p0n} from "./m3284.ts";
import {Box} from "./m2422.ts";
import {Sq,a$e} from "./m2803.ts";
import {at,rs} from "./m2546.ts";
import {p9e,d0n} from "./m3283.ts";
import {wC,jq} from "../src/tui/3282_result.tsx";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function Xza(e,{verbose:t,theme:n}){let{command:r}=e;if(!r)return null;let o=r;if(!t){let s=o.split(`
`),i=s.length>Jza,a=o.length>Tfo;if(i||a){let l=o;if(i)l=s.slice(0,Jza).join(`
`);if(l.length>Tfo)l=l.slice(0,Tfo);return Vf.createElement(Text,null,l.trim(),"\u2026")}}return o}
function Qza(e,{verbose:t,tools:n,terminalSize:r,inProgressToolCallCount:o}){let s=e.at(-1);if(!s||!s.data)return Vf.createElement(Gn,{height:1},Vf.createElement(Text,{dimColor:!0},"Running\u2026"));let i=s.data;return Vf.createElement(Got,{fullOutput:i.fullOutput,output:i.output,elapsedTimeSeconds:i.elapsedTimeSeconds,totalLines:i.totalLines,totalBytes:i.totalBytes,timeoutMs:i.timeoutMs,taskId:i.taskId,verbose:t})}
function Zza(){return Vf.createElement(Gn,{height:1},Vf.createElement(Text,{dimColor:!0},"Waiting\u2026"))}
function eYa(e,t,{verbose:n,theme:r,tools:o,style:s}){let a=t.at(-1)?.data?.timeoutMs,{stdout:l,stderr:c,interrupted:u,returnCodeInterpretation:d,isImage:p,backgroundTaskId:m}=e;if(p)return Vf.createElement(Gn,{height:1},Vf.createElement(Text,{dimColor:!0},"[Image data detected and sent to Claude]"));return Vf.createElement(Box,{flexDirection:"column"},l!==""?Vf.createElement(Sq,{content:l,verbose:n}):null,c.trim()!==""?Vf.createElement(Sq,{content:c,verbose:n,isError:!0}):null,l===""&&c.trim()===""?Vf.createElement(Gn,{height:1},Vf.createElement(Text,{dimColor:!0},m?Vf.createElement(Vf.Fragment,null,"Running in the background"," ",Vf.createElement(at,{chord:"down",action:"manage",parens:!0})):u?"Interrupted":d||"(No output)")):null,a?Vf.createElement(Gn,null,Vf.createElement(p9e,{timeoutMs:a})):null)}
function tYa(e,{verbose:t,progressMessagesForMessage:n,tools:r}){return Vf.createElement(wC,{result:e,verbose:t})}
var Vf,Jza=2,Tfo=160;
var nYa=b(()=>{rs();jq();sc();a$e();p0n();d0n();ze();Vf=M(Te(),1)});
export {Xza,Qza,Zza,eYa,tYa,Vf,Jza,Tfo,nYa};
