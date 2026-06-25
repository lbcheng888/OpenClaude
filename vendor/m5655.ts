// @ts-nocheck
import {resolveGitDir,getCommonDir,VP} from "./m696.ts";
import {cn,Ct} from "./m197.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
async function Hdc(e){if(kdc.has(e))return;kdc.add(e);try{let t=await resolveGitDir(e);if(!t)return;let n=await getCommonDir(t)??t,r=H2o.join(n,"info","exclude"),o="";try{if(o=await Uyt.readFile(r,"utf-8"),o.includes(wdc))return}catch(a){if(cn(a)!=="ENOENT")throw a;await Uyt.mkdir(H2o.join(n,"info"),{recursive:!0})}let s=o&&!o.endsWith(`
`)?`
`:"",i=[wdc,...vVm,""].join(`
`);await Uyt.appendFile(r,s+i)}catch(t){logForDebugging(`ensureClaudeRuntimeFilesExcluded: ${t}`)}}
var Uyt,H2o,vVm,wdc="# claude-code-runtime",kdc;
var Idc=b(()=>{qe();Ct();VP();Uyt=require("fs/promises"),H2o=require("path"),vVm=["**/.claude/scheduled_tasks.lock","**/.claude/scheduled_tasks.json","**/.claude/routines/.state/","**/.claude/worktrees/","**/.claude/checkpoints/","**/.claude/mailbox/","**/.claude/agent-registry.json","**/.claude/agent-memory-local","**/.claude/first-run","**/.claude/assistant-daemon-state.json"],kdc=new Set});
export {Hdc,Uyt,H2o,vVm,wdc,kdc,Idc};
