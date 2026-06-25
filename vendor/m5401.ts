// @ts-nocheck
import {Ne} from "./m583.ts";
import {getIsGit,gitExe,ia} from "./m698.ts";
import {xse,KQ} from "./m2039.ts";
import {execFileNoThrowWithCwd,Ii} from "./m690.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
import {Wi,Hn} from "./m100.ts";
import {i_e,tx} from "./m3307.ts";
import {tr,getCurrentProjectConfig,saveCurrentProjectConfig} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {Ir} from "./m584.ts";
function JBm(e){return!YBm.some((t)=>t.test(e))}
function XBm(e,t){let n=[],r=new Set,o=new Map;for(let s=1;n.length<t&&s<=t;s++)for(let i of e){if(n.length>=t)break;if(!JBm(i))continue;let a=Math.max(i.lastIndexOf("/"),i.lastIndexOf("\\")),l=a>=0?i.slice(a+1):i;if(!l||r.has(l))continue;let c=a>=0?i.slice(0,a):".";if((o.get(c)??0)>=s)continue;n.push(l),r.add(l),o.set(c,(o.get(c)??0)+1)}return n.length>=t?n:[]}
async function QBm(){if(Ne.platform==="win32")return[];if(!await getIsGit())return[];try{let e=await xse(),t=["log","-n","1000","--pretty=format:","--name-only","--diff-filter=M"],n=new Map,r=(s)=>{for(let i of s.split(`
`)){let a=i.trim();if(a)n.set(a,(n.get(a)??0)+1)}};if(e){let{stdout:s}=await execFileNoThrowWithCwd("git",[...t,`--author=${e}`],{cwd:isTmuxControlMode()});r(s)}if(n.size<10){let{stdout:s}=await execFileNoThrowWithCwd(gitExe(),t,{cwd:isTmuxControlMode()});r(s)}let o=Array.from(n.entries()).sort((s,i)=>i[1]-s[1]).map(([s])=>s);return XBm(o,5)}catch(e){return logForDebugging(`Failed to collect frequently-modified files from git history: ${e}`,{level:"error"}),[]}}
var YBm,ZBm=604800000,PYl,OYl;
var JFo=b(()=>{Wi();i_e();Po();tr();qe();Ir();Ii();ia();KQ();YBm=[/(?:^|\/)(?:package-lock\.json|yarn\.lock|bun\.lock|bun\.lockb|pnpm-lock\.yaml|Pipfile\.lock|poetry\.lock|Cargo\.lock|Gemfile\.lock|go\.sum|composer\.lock|uv\.lock)$/,/\.generated\./,/(?:^|\/)(?:dist|build|out|target|node_modules|\.next|__pycache__)\//,/\.(?:min\.js|min\.css|map|pyc|pyo)$/,/\.(?:json|ya?ml|toml|xml|ini|cfg|conf|env|lock|txt|md|mdx|rst|csv|log|svg)$/i,/(?:^|\/)\.?(?:eslintrc|prettierrc|babelrc|editorconfig|gitignore|gitattributes|dockerignore|npmrc)/,/(?:^|\/)(?:tsconfig|jsconfig|biome|vitest\.config|jest\.config|webpack\.config|vite\.config|rollup\.config)\.[a-z]+$/,/(?:^|\/)\.(?:github|vscode|idea|claude)\//,/(?:^|\/)(?:CHANGELOG|LICENSE|CONTRIBUTING|CODEOWNERS|README)(?:\.[a-z]+)?$/i];PYl=Hn(()=>{let e=getCurrentProjectConfig(),t=e.exampleFiles?.length?tx(e.exampleFiles):"<filepath>",n=["fix lint errors","fix typecheck errors",`how does ${t} work?`,`refactor ${t}`,"how do I log an error?",`edit ${t} to...`,`write a test for ${t}`,"create a util logging.py that..."];return`Try "${tx(n)}"`}),OYl=Hn(async()=>{let e=getCurrentProjectConfig(),t=Date.now(),n=e.exampleFilesGeneratedAt??0;if(t-n>ZBm)e.exampleFiles=[];if(!e.exampleFiles?.length)QBm().then((r)=>{if(r.length)saveCurrentProjectConfig((o)=>({...o,exampleFiles:r,exampleFilesGeneratedAt:Date.now()}))})})});
export {JBm,XBm,QBm,YBm,ZBm,PYl,OYl,JFo};
