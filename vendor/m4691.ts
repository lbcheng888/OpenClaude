// @ts-nocheck
import {EWt,CWt,Xvo} from "../src/core/4691_input.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {findGitRoot,ia} from "./m698.ts";
import {Ske,Gk} from "./m2727.ts";
import {withTimeout} from "../src/telemetry/1488_withTimeout.ts";
import {b,x} from "../runtime.ts";
import {vKr} from "./m2726.ts";
function JSl(e,t){return{readFileState:t,bashTools:EWt(e),bashHosts:CWt(e)}}
function k7n(e,t){let n=t;if(!n?.signals||!n.signals.cli?.length&&!n.signals.filesRead?.length&&!n.signals.manifestDeps?.length&&!n.signals.hosts?.length&&!n.signals.cwd?.length)return null;let r;try{if(n.signals.manifestDeps?.length)r=n.signals.manifestDeps.map((s)=>({file:new RegExp(s.file,"i"),pattern:new RegExp(s.pattern)}))}catch(s){return logForDebugging(`Skipping relevance signals for "${e}": invalid RegExp in relevance.signals: ${s}`,{level:"warn"}),null}let o=n.signals.hosts?.map((s)=>s.toLowerCase());return{cli:n.signals.cli,hosts:o,filesRead:n.signals.filesRead,manifestDep:r,cwd:n.signals.cwd}}
async function H7n(e,t){let{bashTools:n,bashHosts:r}=t??{};if(e.cli&&n?.size){let i=e.cli.find((a)=>n.has(a));if(i)return{signal:"cli",command:i}}if(e.hosts?.length&&r?.size){let i=e.hosts.find((a)=>r.has(a));if(i)return{signal:"hosts",host:i}}if(e.cwd?.length){let i=isTmuxControlMode().replaceAll("\\","/"),a=findGitRoot(isTmuxControlMode())?.replaceAll("\\","/"),l=[i];if(a&&i.startsWith(`${a}/`))l.push(i.slice(a.length+1));for(let c of e.cwd){let u=c.replace(/\/+$/,"").replace(/\/\*\*$/,"");if(!u)continue;if(l.some((d)=>Qvo.default.isMatch(d,[u,`${u}/**`],{nocase:!0,dot:!0})))return{signal:"cwd"}}}let o=t?.readFileState,s=o?Ske(o):[];if(e.filesRead?.length&&s.length){let i=s.find((a)=>Qvo.default.isMatch(a.replaceAll("\\","/"),e.filesRead,{nocase:!0,dot:!0}));if(i)return{signal:"filesRead",file:i}}if(e.manifestDep&&o&&s.length>0){let i=new Map(o.entries()),a=(async()=>{for(let{file:c,pattern:u}of e.manifestDep)for(let d of s){if(!c.test(d))continue;try{let p=i.get(d),m=p&&p.limit===void 0&&(p.offset??1)<=1&&!p.isPartialView?p.content:void 0;if(!m){if((await w7n.stat(d)).size>524288)continue;m=await w7n.readFile(d,"utf8")}if(u.test(m))return d}catch{}}return null})(),l=await withTimeout(a,50,"manifestDep scan").catch(()=>null);if(l)return{signal:"manifestDep",file:l}}return null}
var w7n,Qvo;
var _ht=b(()=>{Xvo();Po();qe();Gk();ia();w7n=require("fs/promises"),Qvo=x(vKr(),1)});
export {JSl,k7n,H7n,w7n,Qvo,_ht};
