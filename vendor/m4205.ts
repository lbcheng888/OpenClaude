// @ts-nocheck
import {zn} from "../src/api/0465_getOauthConfig.ts";
import {zqn,ugo,dgo} from "./m4203.ts";
import {Bw,Nte} from "./m4186.ts";
import {lv,vw} from "./m5178.ts";
import {Sn,lr} from "./m233.ts";
import {formatBarElapsed,Xo} from "./m240.ts";
import {b} from "../runtime.ts";
function fgo(e){let t=zn(e.agents,(c)=>c.state==="done"),n=zn(e.agents,(c)=>c.state==="error"),r=e.agents.length,o=t+n===r&&r>0,s=0,i=1/0,a=0;for(let c of e.agents){if(c.tokens)s+=c.tokens;if(c.startedAt!=null){if(c.startedAt<i)i=c.startedAt;let u=c.lastProgressAt??c.startedAt;if(u>a)a=u}}let l=i<1/0?a-i:0;return{title:e.title,status:o?n>0?"failed":"done":"running",agents:e.agents,doneCount:t,totalCount:r,tokens:s,durationMs:l}}
function ZFp(e){return{title:e,status:"not-started",agents:[],doneCount:0,totalCount:0,tokens:0,durationMs:0}}
function u7a(e){return e.toLowerCase().trim()}
function eBp(e,t){let n=new Set,r=[];function o(s){let i=u7a(s);for(let a of t){if(n.has(a))continue;let l=u7a(a.title);if(i===l||l.startsWith(i)||i.startsWith(l))return n.add(a),a}return}for(let s of e??[]){let i=o(s.title);r.push(i?fgo(i):ZFp(s.title))}for(let s of t)if(!n.has(s))r.push(fgo(s));return r}
function d7a(e){let t=zqn(e.workflowProgress),n=ugo(t.agents,t.phaseTitles)??[],r=eBp(e.phases,n);if(r.length===0&&t.agents.length>0)return[fgo({phaseIndex:0,title:"Agents",agents:t.agents})];return r}
function p7a(e,t){let n=0,r=0;for(let o of e)n+=o.doneCount,r+=o.totalCount;return{doneAgents:n,totalAgents:Math.max(t,r,n)}}
function m7a(e){if(e.script.length>0){let t=Bw(e.script);if(!("error"in t)&&t.meta.description)return t.meta.description}return e.description||e.summary||""}
function f7a(e,t,n,r){let o=e.status==="completed"?" \xB7 done":e.status==="killed"?" \xB7 stopped":e.status==="paused"?" \xB7 paused":lv(e.status)?" \xB7 failed":"",s=t,i=`${n.doneAgents}/${n.totalAgents} ${Sn(n.totalAgents,"agent")} \xB7 ${formatBarElapsed(r)}${o}`;return{name:e.workflowName??e.summary??e.description,subtext:s,stats:i}}
function Yqn(e,t=0){let n=0,r=0,o=0,s=!1;for(let l of e){if(l.type!=="workflow_agent")continue;if(n++,l.state==="done")r++;else if(l.state==="error")o++;else if(l.state==="start"||l.state==="progress")s=!0}let i=Math.max(t,n),a=!s&&n>0&&r+o>=i;return{done:r,failedCount:o,running:s,total:i,complete:a}}
var Jqn=b(()=>{vw();Xo();lr();dgo();Nte()});
export {fgo,ZFp,u7a,eBp,d7a,p7a,m7a,f7a,Yqn,Jqn};
