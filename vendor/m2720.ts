// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {withTimeout} from "../src/telemetry/1483_withTimeout.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Se,bt} from "./m195.ts";
import {Twn,l8r} from "./m2719.ts";
import {jRe,i8r} from "./m2718.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
var rFi={};
isFullscreenWithTTY(rFi,{safeInline:()=>safeInline,getProjectContextBlock:()=>getProjectContextBlock,formatProjectContext:()=>formatProjectContext,describeSyncSource:()=>describeSyncSource});
async function getProjectContextBlock(){let e=process.env.CLAUDE_PROJECT_UUID?.trim();if(!e)return null;try{return await withTimeout(Rwd(e),vwd,"project context fetch timed out")}catch(t){return logForDebugging(`project context fetch failed: ${Se(t)}`,{level:"warn"}),null}}
async function Rwd(e){let t=await Twn();if(!t.ok)return logForDebugging(`project context skipped: ${t.reason}`,{level:"verbose"}),null;return formatProjectContext(await jRe(e))}
function safeInline(e){return e.replace(/[\r\n]+/g," ").replace(/`/g,"'")}
function QBi(e){let t=e.slice(0,eFi),n=e.length-t.length;return t.join(`
`)+(n>0?`
- \u2026 and ${n} more \u2014 call \`project_info\` for the full list`:"")}
function describeSyncSource(e){let t=Cwd[e.type??""]??safeInline(e.type??"source"),n=safeInline(Le(e.config)),r=[...n],o=r.length>ZBi?`${r.slice(0,ZBi).join("")}\u2026`:n;return`${t}: \`${o}\``}
function formatProjectContext(e){let t=e.documents.map((a)=>a.file_name).filter((a)=>a!==null),n=(e.files??[]).filter((a)=>a.file_name!==null),r=e.sync_sources??[],o=r.slice(0,eFi),s=r.length-o.length,i=o.map((a)=>`- ${describeSyncSource(a)}`).join(`
`)+(s>0?`
- \u2026 and ${s} more \u2014 call \`project_info\` for the full list`:"");return[`This session is attached to the Project **"${safeInline(e.name)}"**.`,"",...e.description?["## Project description",e.description,""]:[],...e.prompt_template?["## Project instructions",e.prompt_template,""]:[],`## Project docs (${t.length})`,QBi(t.map((a)=>`- \`${safeInline(a)}\``))||"(none yet)","",...n.length>0?[`## Project files (${n.length})`,QBi(n.map((a)=>`- \`${safeInline(a.file_name)}\` (${safeInline(a.file_kind)})`)),""]:[],...r.length>0?[`## Synced sources (${r.length})`,i,"These are synced automatically \u2014 use the matching connector tool (Google Drive, GitHub, etc.) to read them.",""]:[],"## When to use the Projects tool","- **Before answering questions about anything in the doc list above**, read or search the relevant doc with `project_read` or `project_search`. Do not Glob/Grep the local filesystem for these \u2014 they live in the project, not on disk.","- **When you produce something durable and relevant to this project** \u2014 a new doc, an update to an existing one, a captured decision or finding the user or their team would look for here later \u2014 write it to the project with `project_write`. The project is what they see across Claude products. Be selective: write things that belong alongside the existing docs, not every artifact or note.","- **To edit a project doc**, `project_read` it, make the change, and `project_write` the full updated content back to the same path. There is no in-place patch.","- **You don't have to use the project for everything.** If the request is unrelated to it, answer normally without reading or writing the project."].join(`
`)}
var eFi=50,Cwd,vwd=5000,ZBi=200;
var c8r=b(()=>{qe();bt();Xt();i8r();l8r();Cwd={gdrive:"Google Drive",github:"GitHub",outlin:"Outline",mcpres:"MCP resource"}});
export {rFi,getProjectContextBlock,Rwd,safeInline,QBi,describeSyncSource,formatProjectContext,eFi,Cwd,vwd,ZBi,c8r};
