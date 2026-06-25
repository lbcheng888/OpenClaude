// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {qt,tn} from "../src/config/0230_encoding.ts";
import {b} from "../runtime.ts";
import {MS} from "./m460.ts";
import {ig} from "./m130.ts";
import {Ni} from "./m127.ts";
import {ve} from "./m461.ts";
import {jt} from "./m253.ts";
function Nzl(e){return e.find((t)=>t.type==="connected"&&t.name.includes("slack"))}
async function RNm(e,t){let n=Nzl(e);if(!n||n.type!=="connected")return[];try{let o=(await n.client.callTool({name:ANm,arguments:{query:t,limit:20,channel_types:"public_channel,private_channel"}},void 0,{timeout:5000})).content;if(!Array.isArray(o))return[];let s=o.filter((i)=>i.type==="text").map((i)=>i.text).join(`
`);return kNm(wNm(s))}catch(r){return logForDebugging(`Failed to fetch Slack channels: ${r}`),[]}}
function wNm(e){let t=e.trim();if(!t.startsWith("{"))return e;try{let n=vNm().safeParse(qt(t));if(n.success)return n.data.results}catch{}return e}
function kNm(e){let t=[],n=new Set;for(let r of e.split(`
`)){let o=r.match(/^Name:\s*#?([a-z0-9][a-z0-9_-]{0,79})\s*$/);if(o&&!n.has(o[1]))n.add(o[1]),t.push(o[1])}return t}
function ber(e){return Nzl(e)!==void 0}
function Fzl(){return Ozl}
function Bzl(e){let t=[],n=/(^|\s)#([a-z0-9][a-z0-9_-]{0,79})(?=\s|$)/g,r;while((r=n.exec(e))!==null){if(!Ser.has(r[2]))continue;let o=r.index+r[1].length;t.push({start:o,end:o+1+r[2].length})}return t}
function HNm(e){let t=Math.max(e.lastIndexOf("-"),e.lastIndexOf("_"));return t>0?e.slice(0,t):e}
function INm(e,t){let n,r=0;for(let[o,s]of iyt)if(e.startsWith(o)&&o.length>r&&s.some((i)=>i.startsWith(t)))n=s,r=o.length;return n}
async function Uzl(e,t){if(!t)return[];let n=HNm(t),r=t.toLowerCase(),o=iyt.get(n)??INm(n,r);if(!o)if(Ter===n&&D7t)o=await D7t;else{Ter=n,D7t=RNm(e,n),o=await D7t,iyt.set(n,o);let s=Ser.size;for(let i of o)Ser.add(i);if(Ser.size!==s)Ozl++,Lzl.emit();if(iyt.size>50)iyt.delete(iyt.keys().next().value);if(Ter===n)Ter=null,D7t=null}return o.filter((s)=>s.startsWith(r)).sort().slice(0,10).map((s)=>({id:`slack-channel-${s}`,displayText:`#${s}`}))}
var ANm="slack_search_channels",iyt,Ser,Ozl=0,Lzl,Mzl,Ter=null,D7t=null,vNm;
var dFo=b(()=>{MS();qe();ig();tn();iyt=new Map,Ser=new Set,Lzl=Ni(),Mzl=Lzl.subscribe;vNm=ve(()=>jt.object({results:jt.string()}))});
export {Nzl,RNm,wNm,kNm,ber,Fzl,Bzl,HNm,INm,Uzl,ANm,iyt,Ser,Ozl,Lzl,Mzl,Ter,D7t,vNm,dFo};
