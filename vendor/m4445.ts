// @ts-nocheck
import {_pt,ljn} from "./m4430.ts";
import {jt,wX,ws} from "./m228.ts";
import {RA,iF,Y_n,Ev} from "./m2211.ts";
import {Y0e,iJ,D6} from "../src/agent/5186_bigint.ts";
import {kee,kkn,bL,Hq} from "./m3140.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {aF,nP,Om} from "../src/config/2215_level.ts";
import {xu,tA} from "../src/config/2201_tA.ts";
import {zc,ex} from "./m2582.ts";
import {Ua,ty} from "./m2245.ts";
import {Ws,ef} from "./m2248.ts";
import {NFe,uZ} from "../src/config/2245_displayName.ts";
import {b} from "../runtime.ts";
import {ta,wn} from "./m45.ts";
import {ln,Oe,Ie} from "../src/telemetry/0594_feature_name.ts";
import {N5,TT} from "./m2583.ts";
import {gg,loadAllPluginsCacheOnly} from "../src/agent/4445_resolvePluginRoot.ts";
async function irl(e,t,n,r,o,s){let i=[];return await _pt(e,async(a,l)=>{let c=await lrl(a,t,l,n,r,o,s);if(c)i.push(c)},{logLabel:"agents"}),i}
async function lrl(e,t,n,r,o,s,i){let a=jt();if(wX(a,e,i))return null;try{let l=await a.readFile(e,{encoding:"utf-8"}),{frontmatter:c,content:u}=RA(l,e,{normalizeKeys:!0}),d=(c.name!=null?String(c.name):void 0)||arl.basename(e).replace(/\.md$/,""),m=[t,...n,d].join(":"),f=iF(c.description,m)??iF(c.when_to_use,m)??iF(c["when-to-use"],m)??`Agent from ${t} plugin`,A=Y0e(c.tools),h=iJ(c.skills),g=c.color,_=c.model,y;if(typeof _==="string"&&_.trim().length>0){let O=_.trim();y=O.toLowerCase()==="inherit"?"inherit":O}let T=c.background,S=T==="true"||T===!0?!0:void 0,v=kee(u.trim(),{path:o,source:r});if(s.userConfig)v=kkn(v,bL(r),s.userConfig);let R=c.memory,k;if(R!==void 0)if(srl.includes(R))k=R;else logForDebugging(`Plugin agent file ${e} has invalid memory value '${R}'. Valid options: ${srl.join(", ")}`);let H=c.isolation==="worktree"?"worktree":void 0,I=c.effort,P=I!==void 0?aF(I):void 0;if(I!==void 0&&P===void 0)logForDebugging(`Plugin agent file ${e} has invalid effort '${I}'. Valid options: ${nP.join(", ")} or an integer`);for(let O of["permissionMode","hooks","mcpServers"])if(c[O]!==void 0)logForDebugging(`Plugin agent file ${e} sets ${O}, which is ignored for plugin agents. Use .claude/agents/ for this level of control.`,{level:"warn"});let L=c.maxTurns,D=Y_n(L);if(L!==void 0&&D===void 0)logForDebugging(`Plugin agent file ${e} has invalid maxTurns '${L}'. Must be a positive integer.`);let N=c.disallowedTools!==void 0?Y0e(c.disallowedTools):void 0;if(xu()&&k&&A!==void 0){let O=new Set(A);for(let $ of[zc,Ua,Ws])if(!O.has($))A=[...A,$]}return{agentType:m,whenToUse:f,tools:A,...N!==void 0&&{disallowedTools:N},...h!==void 0&&{skills:h},getSystemPrompt:()=>{if(xu()&&k){let O=NFe(m,k);return v+`

`+O}return v},source:"plugin",color:g,model:y,filename:d,plugin:r,...S&&{background:S},...k&&{memory:k},...H&&{isolation:H},...P!==void 0&&{effort:P},...D!==void 0&&{maxTurns:D}}}catch(l){return logForDebugging(`Failed to load agent from ${e}: ${l}`,{level:"error"}),null}}
function fjn(){Rqt.cache?.clear?.()}
var arl,srl,Rqt;
var Ajn=b(()=>{ta();tA();ln();uZ();ty();ef();ex();N5();qe();Om();Ev();ws();D6();gg();Hq();ljn();arl=require("path"),srl=["user","project","local"];Rqt=wn(async()=>{let{enabled:e,errors:t}=await loadAllPluginsCacheOnly();if(t.length>0)logForDebugging(`Plugin loading errors: ${t.map((s)=>TT(s)).join(", ")}`);let n=null,o=(await Promise.all(e.map(async(s)=>{let i=new Set,a=[];if(s.agentsPath)try{let l=await irl(s.agentsPath,s.name,s.source,s.path,s.manifest,i);if(a.push(...l),l.length>0)logForDebugging(`Loaded ${l.length} agents from plugin ${s.name} default directory`)}catch(l){n="plugin_load_agents_dir_failed",logForDebugging(`Failed to load agents from plugin ${s.name} default directory: ${l}`,{level:"error"})}if(s.agentsPaths){let l=await Promise.all(s.agentsPaths.map(async(c)=>{try{let d=await jt().stat(c);if(d.isDirectory()){let p=await irl(c,s.name,s.source,s.path,s.manifest,i);if(p.length>0)logForDebugging(`Loaded ${p.length} agents from plugin ${s.name} custom path: ${c}`);return p}else if(d.isFile()&&c.endsWith(".md")){let p=await lrl(c,s.name,[],s.source,s.path,s.manifest,i);if(p)return logForDebugging(`Loaded agent from plugin ${s.name} custom file: ${c}`),[p]}return[]}catch(u){return n="plugin_load_agents_path_failed",logForDebugging(`Failed to load agents from plugin ${s.name} custom path ${c}: ${u}`,{level:"error"}),[]}}));for(let c of l)a.push(...c)}return a}))).flat();if(logForDebugging(`Total plugin agents loaded: ${o.length}`),n)Oe("plugin_load_agents",n);else Ie("plugin_load_agents");return o})});
export {irl,lrl,fjn,arl,srl,Rqt,Ajn};
