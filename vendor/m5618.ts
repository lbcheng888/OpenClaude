// @ts-nocheck
import {resolveGitDir,getCommonDir,vO} from "./m691.ts";
import {dn,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
async function jnc(e){if(qnc.has(e))return;qnc.add(e);try{let t=await resolveGitDir(e);if(!t)return;let n=await getCommonDir(t)??t,r=i1o.join(n,"info","exclude"),o="";try{if(o=await _ht.readFile(r,"utf-8"),o.includes($nc))return}catch(a){if(dn(a)!=="ENOENT")throw a;await _ht.mkdir(i1o.join(n,"info"),{recursive:!0})}let s=o&&!o.endsWith(`
`)?`
`:"",i=[$nc,...e9m,""].join(`
`);await _ht.appendFile(r,s+i)}catch(t){logForDebugging(`ensureClaudeRuntimeFilesExcluded: ${t}`)}}
var _ht,i1o,e9m,$nc="# claude-code-runtime",qnc;
var Wnc=b(()=>{qe();bt();vO();_ht=require("fs/promises"),i1o=require("path"),e9m=["**/.claude/scheduled_tasks.lock","**/.claude/scheduled_tasks.json","**/.claude/routines/.state/","**/.claude/worktrees/","**/.claude/checkpoints/","**/.claude/mailbox/","**/.claude/agent-registry.json","**/.claude/agent-memory-local","**/.claude/first-run","**/.claude/assistant-daemon-state.json"],qnc=new Set});
export {jnc,_ht,i1o,e9m,$nc,qnc,Wnc};
