// @ts-nocheck
import {Wn} from "../src/api/0459_getOauthConfig.ts";
import {K9n,_do,ydo} from "./m4188.ts";
import {AI,Mce} from "./m4173.ts";
import {nR,Ax} from "./m5146.ts";
import {Cn,dr} from "./m231.ts";
import {formatBarElapsed,ps} from "./m238.ts";
import {b} from "../runtime.ts";
function bdo(e){let t=Wn(e.agents,(c)=>c.state==="done"),n=Wn(e.agents,(c)=>c.state==="error"),r=e.agents.length,o=t+n===r&&r>0,s=0,i=1/0,a=0;for(let c of e.agents){if(c.tokens)s+=c.tokens;if(c.startedAt!=null){if(c.startedAt<i)i=c.startedAt;let u=c.lastProgressAt??c.startedAt;if(u>a)a=u}}let l=i<1/0?a-i:0;return{title:e.title,status:o?n>0?"failed":"done":"running",agents:e.agents,doneCount:t,totalCount:r,tokens:s,durationMs:l}}
function L0p(e){return{title:e,status:"not-started",agents:[],doneCount:0,totalCount:0,tokens:0,durationMs:0}}
function tja(e){return e.toLowerCase().trim()}
function M0p(e,t){let n=new Set,r=[];function o(s){let i=tja(s);for(let a of t){if(n.has(a))continue;let l=tja(a.title);if(i===l||l.startsWith(i)||i.startsWith(l))return n.add(a),a}return}for(let s of e??[]){let i=o(s.title);r.push(i?bdo(i):L0p(s.title))}for(let s of t)if(!n.has(s))r.push(bdo(s));return r}
function nja(e){let t=K9n(e.workflowProgress),n=_do(t.agents,t.phaseTitles)??[],r=M0p(e.phases,n);if(r.length===0&&t.agents.length>0)return[bdo({phaseIndex:0,title:"Agents",agents:t.agents})];return r}
function rja(e,t){let n=0,r=0;for(let o of e)n+=o.doneCount,r+=o.totalCount;return{doneAgents:n,totalAgents:Math.max(t,r,n)}}
function oja(e){if(e.script.length>0){let t=AI(e.script);if(!("error"in t)&&t.meta.description)return t.meta.description}return e.description||e.summary||""}
function sja(e,t,n,r){let o=e.status==="completed"?" \xB7 done":e.status==="killed"?" \xB7 stopped":e.status==="paused"?" \xB7 paused":nR(e.status)?" \xB7 failed":"",s=t,i=`${n.doneAgents}/${n.totalAgents} ${Cn(n.totalAgents,"agent")} \xB7 ${formatBarElapsed(r)}${o}`;return{name:e.workflowName??e.summary??e.description,subtext:s,stats:i}}
function Y9n(e,t=0){let n=0,r=0,o=0,s=!1;for(let l of e){if(l.type!=="workflow_agent")continue;if(n++,l.state==="done")r++;else if(l.state==="error")o++;else if(l.state==="start"||l.state==="progress")s=!0}let i=Math.max(t,n),a=!s&&n>0&&r+o>=i;return{done:r,failedCount:o,running:s,total:i,complete:a}}
var J9n=b(()=>{Ax();ps();dr();ydo();Mce()});
export {bdo,L0p,tja,M0p,nja,rja,oja,sja,Y9n,J9n};
