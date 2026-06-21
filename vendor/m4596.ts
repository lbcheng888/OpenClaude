// @ts-nocheck
import {Zse,Iy} from "../src/agent/2230_explicitlyRequested.ts";
import {getLargeMemoryFiles,getMemoryFiles,getMaxMemoryCharacterCount,zw} from "../src/config/2717_stripHtmlComments.ts";
import {F6t,Ije,S5n} from "./m4595.ts";
import {$f,HF} from "../src/core/2683_HF.ts";
import {SandboxManager,Ag} from "./m2671.ts";
import {y5n,XTo} from "./m4594.ts";
import {Qm,Sw} from "../src/mcp/0728_serverName.ts";
import {Cn,dr} from "./m231.ts";
import {b} from "../runtime.ts";
async function z7p(){if(Zse())return null;let e=getLargeMemoryFiles(await getMemoryFiles());if(e.length===0)return null;let t=getMaxMemoryCharacterCount(),n=e.sort((o,s)=>s.content.length-o.content.length).map((o)=>`${o.path}: ${o.content.length.toLocaleString()} chars`);return{type:"claudemd_files",severity:"warning",message:e.length===1?`Large CLAUDE.md file detected (${e[0].content.length.toLocaleString()} chars > ${t.toLocaleString()})`:`${e.length} large CLAUDE.md files detected (each > ${t.toLocaleString()} chars)`,details:n,currentValue:e.length,threshold:t}}
async function Y7p(e){if(!e)return null;let t=F6t(e);if(t<=Ije)return null;let n=e.activeAgents.filter((o)=>o.source!=="built-in").map((o)=>{let s=`${o.agentType}: ${o.whenToUse}`;return{name:o.agentType,tokens:$f(s)}}).sort((o,s)=>s.tokens-o.tokens),r=n.slice(0,5).map((o)=>`${o.name}: ~${o.tokens.toLocaleString()} tokens`);if(n.length>5)r.push(`(${n.length-5} more custom agents)`);return{type:"agent_descriptions",severity:"warning",message:`Large agent descriptions (~${t.toLocaleString()} tokens > ${Ije.toLocaleString()})`,details:r,currentValue:t,threshold:Ije}}
async function J7p(e){let t=await e(),n=SandboxManager.isSandboxingEnabled()&&SandboxManager.isAutoAllowBashIfSandboxedEnabled(),r=y5n(t,{sandboxAutoAllowEnabled:n});if(r.length===0)return null;let o=r.flatMap((s)=>[`${Qm(s.rule.ruleValue)}: ${s.reason}`,`  Fix: ${s.fix}`]);return{type:"unreachable_rules",severity:"warning",message:`${r.length} ${Cn(r.length,"unreachable permission rule")} detected`,details:o,currentValue:r.length,threshold:0}}
async function Jcl(e,t){let[n,r,o]=await Promise.all([z7p(),Y7p(e),J7p(t)]);return{claudeMdWarning:n,agentWarning:r,unreachableRulesWarning:o}}
var Xcl=b(()=>{HF();zw();Iy();Sw();XTo();Ag();S5n();dr()});
export {z7p,Y7p,J7p,Jcl,Xcl};
