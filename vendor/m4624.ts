// @ts-nocheck
import {Qse,ky} from "../src/agent/2238_explicitlyRequested.ts";
import {getLargeMemoryFiles,getMemoryFiles,getMaxMemoryCharacterCount,ZR} from "../src/config/2729_stripHtmlComments.ts";
import {lWt,oWe,n7n} from "./m4623.ts";
import {pm,l1} from "../src/core/2694_l1.ts";
import {SandboxManager,Uh} from "./m2682.ts";
import {e7n,dvo} from "./m4622.ts";
import {Gp,gA} from "../src/mcp/0733_serverName.ts";
import {Sn,lr} from "./m233.ts";
import {b} from "../runtime.ts";
async function Qtm(){if(Qse())return null;let e=getLargeMemoryFiles(await getMemoryFiles());if(e.length===0)return null;let t=getMaxMemoryCharacterCount(),n=e.sort((o,s)=>s.content.length-o.content.length).map((o)=>`${o.path}: ${o.content.length.toLocaleString()} chars`);return{type:"claudemd_files",severity:"warning",message:e.length===1?`Large CLAUDE.md file detected (${e[0].content.length.toLocaleString()} chars > ${t.toLocaleString()})`:`${e.length} large CLAUDE.md files detected (each > ${t.toLocaleString()} chars)`,details:n,currentValue:e.length,threshold:t}}
async function Ztm(e){if(!e)return null;let t=lWt(e);if(t<=oWe)return null;let n=e.activeAgents.filter((o)=>o.source!=="built-in").map((o)=>{let s=`${o.agentType}: ${o.whenToUse}`;return{name:o.agentType,tokens:pm(s)}}).sort((o,s)=>s.tokens-o.tokens),r=n.slice(0,5).map((o)=>`${o.name}: ~${o.tokens.toLocaleString()} tokens`);if(n.length>5)r.push(`(${n.length-5} more custom agents)`);return{type:"agent_descriptions",severity:"warning",message:`Large agent descriptions (~${t.toLocaleString()} tokens > ${oWe.toLocaleString()})`,details:r,currentValue:t,threshold:oWe}}
async function enm(e){let t=await e(),n=SandboxManager.isSandboxingEnabled()&&SandboxManager.isAutoAllowBashIfSandboxedEnabled(),r=e7n(t,{sandboxAutoAllowEnabled:n});if(r.length===0)return null;let o=r.flatMap((s)=>[`${Gp(s.rule.ruleValue)}: ${s.reason}`,`  Fix: ${s.fix}`]);return{type:"unreachable_rules",severity:"warning",message:`${r.length} ${Sn(r.length,"unreachable permission rule")} detected`,details:o,currentValue:r.length,threshold:0}}
async function x_l(e,t){let[n,r,o]=await Promise.all([Qtm(),Ztm(e),enm(t)]);return{claudeMdWarning:n,agentWarning:r,unreachableRulesWarning:o}}
var D_l=b(()=>{l1();ZR();ky();gA();dvo();Uh();n7n();lr()});
export {Qtm,Ztm,enm,x_l,D_l};
