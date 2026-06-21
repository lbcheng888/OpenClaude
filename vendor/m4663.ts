// @ts-nocheck
import {ejt,tjt,NSo} from "../src/core/4663_input.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Pt,Go} from "./m632.ts";
import {findGitRoot,Ba} from "./m693.ts";
import {MRe,xk} from "./m2715.ts";
import {withTimeout} from "../src/telemetry/1483_withTimeout.ts";
import {b,M} from "../runtime.ts";
import {Yjr} from "./m2714.ts";
function aml(e,t){return{readFileState:t,bashTools:ejt(e),bashHosts:tjt(e)}}
function G5n(e,t){let n=t;if(!n?.signals||!n.signals.cli?.length&&!n.signals.filesRead?.length&&!n.signals.manifestDeps?.length&&!n.signals.hosts?.length&&!n.signals.cwd?.length)return null;let r;try{if(n.signals.manifestDeps?.length)r=n.signals.manifestDeps.map((s)=>({file:new RegExp(s.file,"i"),pattern:new RegExp(s.pattern)}))}catch(s){return logForDebugging(`Skipping relevance signals for "${e}": invalid RegExp in relevance.signals: ${s}`,{level:"warn"}),null}let o=n.signals.hosts?.map((s)=>s.toLowerCase());return{cli:n.signals.cli,hosts:o,filesRead:n.signals.filesRead,manifestDep:r,cwd:n.signals.cwd}}
async function V5n(e,t){let{bashTools:n,bashHosts:r}=t??{};if(e.cli&&n?.size){let i=e.cli.find((a)=>n.has(a));if(i)return{signal:"cli",command:i}}if(e.hosts?.length&&r?.size){let i=e.hosts.find((a)=>r.has(a));if(i)return{signal:"hosts",host:i}}if(e.cwd?.length){let i=Pt().replaceAll("\\","/"),a=findGitRoot(Pt())?.replaceAll("\\","/"),l=[i];if(a&&i.startsWith(`${a}/`))l.push(i.slice(a.length+1));for(let c of e.cwd){let u=c.replace(/\/+$/,"").replace(/\/\*\*$/,"");if(!u)continue;if(l.some((d)=>BSo.default.isMatch(d,[u,`${u}/**`],{nocase:!0,dot:!0})))return{signal:"cwd"}}}let o=t?.readFileState,s=o?MRe(o):[];if(e.filesRead?.length&&s.length){let i=s.find((a)=>BSo.default.isMatch(a.replaceAll("\\","/"),e.filesRead,{nocase:!0,dot:!0}));if(i)return{signal:"filesRead",file:i}}if(e.manifestDep&&o&&s.length>0){let i=new Map(o.entries()),a=(async()=>{for(let{file:c,pattern:u}of e.manifestDep)for(let d of s){if(!c.test(d))continue;try{let p=i.get(d),m=p&&p.limit===void 0&&(p.offset??1)<=1&&!p.isPartialView?p.content:void 0;if(!m){if((await W5n.stat(d)).size>524288)continue;m=await W5n.readFile(d,"utf8")}if(u.test(m))return d}catch{}}return null})(),l=await withTimeout(a,50,"manifestDep scan").catch(()=>null);if(l)return{signal:"manifestDep",file:l}}return null}
var W5n,BSo;
var njt=b(()=>{NSo();Go();qe();xk();Ba();W5n=require("fs/promises"),BSo=M(Yjr(),1)});
export {aml,G5n,V5n,W5n,BSo,njt};
