// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {withTimeout} from "../src/telemetry/1488_withTimeout.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ce,Ct} from "./m197.ts";
import {cHn,BKr} from "./m2731.ts";
import {wke,NKr} from "./m2730.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
var q4i={};
ft(q4i,{safeInline:()=>safeInline,getProjectContextBlock:()=>getProjectContextBlock,formatProjectContext:()=>formatProjectContext,describeSyncSource:()=>describeSyncSource});
async function getProjectContextBlock(){let e=process.env.CLAUDE_PROJECT_UUID?.trim();if(!e)return null;try{return await withTimeout(oMd(e),nMd,"project context fetch timed out")}catch(t){return logForDebugging(`project context fetch failed: ${Ce(t)}`,{level:"warn"}),null}}
async function oMd(e){let t=await cHn();if(!t.ok)return logForDebugging(`project context skipped: ${t.reason}`,{level:"verbose"}),null;return formatProjectContext(await wke(e))}
function safeInline(e){return e.replace(/[\r\n]+/g," ").replace(/`/g,"'")}
function N4i(e){let t=e.slice(0,B4i),n=e.length-t.length;return t.join(`
`)+(n>0?`
- \u2026 and ${n} more \u2014 call \`project_info\` for the full list`:"")}
function describeSyncSource(e){let t=tMd[e.type??""]??safeInline(e.type??"source"),n=safeInline(TeamDeleteToolName(e.config)),r=[...n],o=r.length>F4i?`${r.slice(0,F4i).join("")}\u2026`:n;return`${t}: \`${o}\``}
function formatProjectContext(e){let t=e.documents.map((a)=>a.file_name).filter((a)=>a!==null),n=(e.files??[]).filter((a)=>a.file_name!==null),r=e.sync_sources??[],o=r.slice(0,B4i),s=r.length-o.length,i=o.map((a)=>`- ${describeSyncSource(a)}`).join(`
`)+(s>0?`
- \u2026 and ${s} more \u2014 call \`project_info\` for the full list`:"");return[`This session is attached to the Project **"${safeInline(e.name)}"**.`,"",...e.description?["## Project description",e.description,""]:[],...e.prompt_template?["## Project instructions",e.prompt_template,""]:[],`## Project docs (${t.length})`,N4i(t.map((a)=>`- \`${safeInline(a)}\``))||"(none yet)","",...n.length>0?[`## Project files (${n.length})`,N4i(n.map((a)=>`- \`${safeInline(a.file_name)}\` (${safeInline(a.file_kind)})`)),""]:[],...r.length>0?[`## Synced sources (${r.length})`,i,"These are synced automatically \u2014 use the matching connector tool (Google Drive, GitHub, etc.) to read them.",""]:[],"## When to use the Projects tool","- **Before answering questions about anything in the doc list above**, read or search the relevant doc with `project_read` or `project_search`. Do not Glob/Grep the local filesystem for these \u2014 they live in the project, not on disk.","- **When you produce something durable and relevant to this project** \u2014 a new doc, an update to an existing one, a captured decision or finding the user or their team would look for here later \u2014 write it to the project with `project_write`. The project is what they see across Claude products. Be selective: write things that belong alongside the existing docs, not every artifact or note.","- **To edit a project doc**, `project_read` it, make the change, and `project_write` the full updated content back to the same path. There is no in-place patch.","- **You don't have to use the project for everything.** If the request is unrelated to it, answer normally without reading or writing the project."].join(`
`)}
var B4i=50,tMd,nMd=5000,F4i=200;
var UKr=b(()=>{qe();Ct();tn();NKr();BKr();tMd={gdrive:"Google Drive",github:"GitHub",outlin:"Outline",mcpres:"MCP resource"}});
export {q4i,getProjectContextBlock,oMd,safeInline,N4i,describeSyncSource,formatProjectContext,B4i,tMd,nMd,F4i,UKr};
