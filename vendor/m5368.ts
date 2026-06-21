// @ts-nocheck
import {je} from "./m577.ts";
import {getIsGit,gitExe,Ba} from "./m693.ts";
import {Ise,JQ} from "./m2034.ts";
import {execFileNoThrowWithCwd,oa} from "./m684.ts";
import {Pt,Go} from "./m632.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
import {ta,wn} from "./m45.ts";
import {Khe,q0} from "./m3291.ts";
import {Qn,getCurrentProjectConfig,saveCurrentProjectConfig} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {Lr} from "./m578.ts";
function q0m(e){return!$0m.some((t)=>t.test(e))}
function j0m(e,t){let n=[],r=new Set,o=new Map;for(let s=1;n.length<t&&s<=t;s++)for(let i of e){if(n.length>=t)break;if(!q0m(i))continue;let a=Math.max(i.lastIndexOf("/"),i.lastIndexOf("\\")),l=a>=0?i.slice(a+1):i;if(!l||r.has(l))continue;let c=a>=0?i.slice(0,a):".";if((o.get(c)??0)>=s)continue;n.push(l),r.add(l),o.set(c,(o.get(c)??0)+1)}return n.length>=t?n:[]}
async function W0m(){if(je.platform==="win32")return[];if(!await getIsGit())return[];try{let e=await Ise(),t=["log","-n","1000","--pretty=format:","--name-only","--diff-filter=M"],n=new Map,r=(s)=>{for(let i of s.split(`
`)){let a=i.trim();if(a)n.set(a,(n.get(a)??0)+1)}};if(e){let{stdout:s}=await execFileNoThrowWithCwd("git",[...t,`--author=${e}`],{cwd:Pt()});r(s)}if(n.size<10){let{stdout:s}=await execFileNoThrowWithCwd(gitExe(),t,{cwd:Pt()});r(s)}let o=Array.from(n.entries()).sort((s,i)=>i[1]-s[1]).map(([s])=>s);return j0m(o,5)}catch(e){return logForDebugging(`Failed to collect frequently-modified files from git history: ${e}`,{level:"error"}),[]}}
var $0m,G0m=604800000,Jjl,Xjl;
var IOo=b(()=>{ta();Khe();Go();Qn();qe();Lr();oa();Ba();JQ();$0m=[/(?:^|\/)(?:package-lock\.json|yarn\.lock|bun\.lock|bun\.lockb|pnpm-lock\.yaml|Pipfile\.lock|poetry\.lock|Cargo\.lock|Gemfile\.lock|go\.sum|composer\.lock|uv\.lock)$/,/\.generated\./,/(?:^|\/)(?:dist|build|out|target|node_modules|\.next|__pycache__)\//,/\.(?:min\.js|min\.css|map|pyc|pyo)$/,/\.(?:json|ya?ml|toml|xml|ini|cfg|conf|env|lock|txt|md|mdx|rst|csv|log|svg)$/i,/(?:^|\/)\.?(?:eslintrc|prettierrc|babelrc|editorconfig|gitignore|gitattributes|dockerignore|npmrc)/,/(?:^|\/)(?:tsconfig|jsconfig|biome|vitest\.config|jest\.config|webpack\.config|vite\.config|rollup\.config)\.[a-z]+$/,/(?:^|\/)\.(?:github|vscode|idea|claude)\//,/(?:^|\/)(?:CHANGELOG|LICENSE|CONTRIBUTING|CODEOWNERS|README)(?:\.[a-z]+)?$/i];Jjl=wn(()=>{let e=getCurrentProjectConfig(),t=e.exampleFiles?.length?q0(e.exampleFiles):"<filepath>",n=["fix lint errors","fix typecheck errors",`how does ${t} work?`,`refactor ${t}`,"how do I log an error?",`edit ${t} to...`,`write a test for ${t}`,"create a util logging.py that..."];return`Try "${q0(n)}"`}),Xjl=wn(async()=>{let e=getCurrentProjectConfig(),t=Date.now(),n=e.exampleFilesGeneratedAt??0;if(t-n>G0m)e.exampleFiles=[];if(!e.exampleFiles?.length)W0m().then((r)=>{if(r.length)saveCurrentProjectConfig((o)=>({...o,exampleFiles:r,exampleFilesGeneratedAt:Date.now()}))})})});
export {q0m,j0m,W0m,$0m,G0m,Jjl,Xjl,IOo};
