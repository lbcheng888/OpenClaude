// @ts-nocheck
import {yft,kGn} from "./m4452.ts";
import {Wt,CX,ps} from "./m230.ts";
import {xf,HF,xbn,HA} from "./m2219.ts";
import {VDe,WY,Xq} from "../src/agent/5220_bigint.ts";
import {Ree,yxn,$O,V4} from "./m3150.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {dynamicTeamContext,gD,Cp} from "../src/config/2223_level.ts";
import {Kc,Jm} from "../src/config/2207_Jm.ts";
import {Ec,dw} from "./m2593.ts";
import {fa,ry} from "./m2253.ts";
import {vs,dm} from "./m2256.ts";
import {OUe,rz} from "../src/config/2253_displayName.ts";
import {b} from "../runtime.ts";
import {Wi,Hn} from "./m100.ts";
import {mn,xe,He} from "../src/telemetry/0600_feature_name.ts";
import {Q8,fT} from "./m2594.ts";
import {path,loadAllPluginsCacheOnly} from "../src/agent/4467_resolvePluginRoot.ts";
async function Kcl(e,t,n,r,o,s){let i=[];return await yft(e,async(a,l)=>{let c=await jcl(a,t,l,n,r,o,s);if(c)i.push(c)},{logLabel:"agents"}),i}
async function jcl(e,t,n,r,o,s,i){let a=Wt();if(CX(a,e,i))return null;try{let l=await a.readFile(e,{encoding:"utf-8"}),{frontmatter:c,content:u}=xf(l,e,{normalizeKeys:!0}),d=(c.name!=null?String(c.name):void 0)||zcl.basename(e).replace(/\.md$/,""),m=[t,...n,d].join(":"),f=HF(c.description,m)??HF(c.when_to_use,m)??HF(c["when-to-use"],m)??`Agent from ${t} plugin`,h=VDe(c.tools),g=WY(c.skills),_=c.color,T=c.model,y;if(typeof T==="string"&&T.trim().length>0){let B=T.trim();y=B.toLowerCase()==="inherit"?"inherit":B}let S=c.background,E=S==="true"||S===!0?!0:void 0,R=Ree(u.trim(),{path:o,source:r});if(s.userConfig)R=yxn(R,$O(r),s.userConfig);let w=c.memory,H;if(w!==void 0)if(Vcl.includes(w))H=w;else logForDebugging(`Plugin agent file ${e} has invalid memory value '${w}'. Valid options: ${Vcl.join(", ")}`);let I=c.isolation==="worktree"?"worktree":void 0,D=c.effort,O=D!==void 0?dynamicTeamContext(D):void 0;if(D!==void 0&&O===void 0)logForDebugging(`Plugin agent file ${e} has invalid effort '${D}'. Valid options: ${gD.join(", ")} or an integer`);for(let B of["permissionMode","hooks","mcpServers"])if(c[B]!==void 0)logForDebugging(`Plugin agent file ${e} sets ${B}, which is ignored for plugin agents. Use .claude/agents/ for this level of control.`,{level:"warn"});let L=c.maxTurns,P=xbn(L);if(L!==void 0&&P===void 0)logForDebugging(`Plugin agent file ${e} has invalid maxTurns '${L}'. Must be a positive integer.`);let M=c.disallowedTools!==void 0?VDe(c.disallowedTools):void 0;if(Kc()&&H&&h!==void 0){let B=new Set(h);for(let N of[Ec,fa,vs])if(!B.has(N))h=[...h,N]}return{agentType:m,whenToUse:f,tools:h,...M!==void 0&&{disallowedTools:M},...g!==void 0&&{skills:g},getSystemPrompt:()=>{if(Kc()&&H){let B=OUe(m,H);return R+`

`+B}return R},source:"plugin",color:_,model:y,filename:d,plugin:r,...E&&{background:E},...H&&{memory:H},...I&&{isolation:I},...O!==void 0&&{effort:O},...P!==void 0&&{maxTurns:P}}}catch(l){return logForDebugging(`Failed to load agent from ${e}: ${l}`,{level:"error"}),null}}
function OGn(){Z5t.cache?.clear?.()}
var zcl,Vcl,Z5t;
var LGn=b(()=>{Wi();Jm();mn();rz();ry();dm();dw();Q8();qe();Cp();HA();ps();Xq();path();V4();kGn();zcl=require("path"),Vcl=["user","project","local"];Z5t=Hn(async()=>{let{enabled:e,errors:t}=await loadAllPluginsCacheOnly();if(t.length>0)logForDebugging(`Plugin loading errors: ${t.map((s)=>fT(s)).join(", ")}`);let n=null,o=(await Promise.all(e.map(async(s)=>{let i=new Set,a=[];if(s.agentsPath)try{let l=await Kcl(s.agentsPath,s.name,s.source,s.path,s.manifest,i);if(a.push(...l),l.length>0)logForDebugging(`Loaded ${l.length} agents from plugin ${s.name} default directory`)}catch(l){n="plugin_load_agents_dir_failed",logForDebugging(`Failed to load agents from plugin ${s.name} default directory: ${l}`,{level:"error"})}if(s.agentsPaths){let l=await Promise.all(s.agentsPaths.map(async(c)=>{try{let d=await Wt().stat(c);if(d.isDirectory()){let p=await Kcl(c,s.name,s.source,s.path,s.manifest,i);if(p.length>0)logForDebugging(`Loaded ${p.length} agents from plugin ${s.name} custom path: ${c}`);return p}else if(d.isFile()&&c.endsWith(".md")){let p=await jcl(c,s.name,[],s.source,s.path,s.manifest,i);if(p)return logForDebugging(`Loaded agent from plugin ${s.name} custom file: ${c}`),[p]}return[]}catch(u){return n="plugin_load_agents_path_failed",logForDebugging(`Failed to load agents from plugin ${s.name} custom path ${c}: ${u}`,{level:"error"}),[]}}));for(let c of l)a.push(...c)}return a}))).flat();if(logForDebugging(`Total plugin agents loaded: ${o.length}`),n)xe("plugin_load_agents",n);else He("plugin_load_agents");return o})});
export {Kcl,jcl,OGn,zcl,Vcl,Z5t,LGn};
