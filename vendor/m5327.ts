// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {qt,Xt} from "../src/config/0228_encoding.ts";
import {b} from "../runtime.ts";
import {iv} from "./m454.ts";
import {kg} from "./m129.ts";
import {ca} from "./m5.ts";
import {we} from "./m455.ts";
import {hn} from "./m251.ts";
function kql(e){return e.find((t)=>t.type==="connected"&&t.name.includes("slack"))}
async function Jkm(e,t){let n=kql(e);if(!n||n.type!=="connected")return[];try{let o=(await n.client.callTool({name:Ykm,arguments:{query:t,limit:20,channel_types:"public_channel,private_channel"}},void 0,{timeout:5000})).content;if(!Array.isArray(o))return[];let s=o.filter((i)=>i.type==="text").map((i)=>i.text).join(`
`);return Zkm(Qkm(s))}catch(r){return logForDebugging(`Failed to fetch Slack channels: ${r}`),[]}}
function Qkm(e){let t=e.trim();if(!t.startsWith("{"))return e;try{let n=Xkm().safeParse(qt(t));if(n.success)return n.data.results}catch{}return e}
function Zkm(e){let t=[],n=new Set;for(let r of e.split(`
`)){let o=r.match(/^Name:\s*#?([a-z0-9][a-z0-9_-]{0,79})\s*$/);if(o&&!n.has(o[1]))n.add(o[1]),t.push(o[1])}return t}
function lJn(e){return kql(e)!==void 0}
function Hql(){return wql}
function Iql(e){let t=[],n=/(^|\s)#([a-z0-9][a-z0-9_-]{0,79})(?=\s|$)/g,r;while((r=n.exec(e))!==null){if(!aJn.has(r[2]))continue;let o=r.index+r[1].length;t.push({start:o,end:o+1+r[2].length})}return t}
function eHm(e){let t=Math.max(e.lastIndexOf("-"),e.lastIndexOf("_"));return t>0?e.slice(0,t):e}
function tHm(e,t){let n,r=0;for(let[o,s]of qAt)if(e.startsWith(o)&&o.length>r&&s.some((i)=>i.startsWith(t)))n=s,r=o.length;return n}
async function Dql(e,t){if(!t)return[];let n=eHm(t),r=t.toLowerCase(),o=qAt.get(n)??tHm(n,r);if(!o)if(iJn===n&&oGt)o=await oGt;else{iJn=n,oGt=Jkm(e,n),o=await oGt,qAt.set(n,o);let s=aJn.size;for(let i of o)aJn.add(i);if(aJn.size!==s)wql++,Rql.emit();if(qAt.size>50)qAt.delete(qAt.keys().next().value);if(iJn===n)iJn=null,oGt=null}return o.filter((s)=>s.startsWith(r)).sort().slice(0,10).map((s)=>({id:`slack-channel-${s}`,displayText:`#${s}`}))}
var Ykm="slack_search_channels",qAt,aJn,wql=0,Rql,xql,iJn=null,oGt=null,Xkm;
var OPo=b(()=>{iv();qe();kg();Xt();qAt=new Map,aJn=new Set,Rql=ca(),xql=Rql.subscribe;Xkm=we(()=>hn.object({results:hn.string()}))});
export {kql,Jkm,Qkm,Zkm,lJn,Hql,Iql,eHm,tHm,Dql,Ykm,qAt,aJn,wql,Rql,xql,iJn,oGt,Xkm,OPo};
