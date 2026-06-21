// @ts-nocheck
import {tr,sn} from "../src/config/0047_namespace.ts";
import {Pue,wwl} from "./m4939.ts";
import {Pt,Go} from "./m632.ts";
import {RR,h7} from "./m704.ts";
import {isBuiltInAgent,isPluginAgent,scrubPathsConfig} from "../src/permissions/4454_toAgentInfos.ts";
import {jt,ws} from "./m228.ts";
import {dn,bt} from "./m195.ts";
import {RA,z_n,Ev} from "./m2211.ts";
import {b} from "../runtime.ts";
function aam(e,t,n,r,o,s,i,a){let l=t.replaceAll("\\","\\\\").replaceAll('"',"\\\"").replaceAll(`
`,"\\\\n"),u=n===void 0||n.length===1&&n[0]==="*"?"":`
tools: ${n.join(", ")}`,d=s?`
model: ${s}`:"",p=a!==void 0?`
effort: ${a}`:"",m=o?`
color: ${o}`:"",f=i?`
memory: ${i}`:"";return`---
name: "${e}"
description: "${l}"${u}${d}${p}${m}${f}
---

${r}
`}
function TVn(e){switch(e){case"flagSettings":throw Error(`Cannot get directory path for ${e} agents`);case"userSettings":return Lne.join(tr(),Pue.AGENTS_DIR);case"projectSettings":return Lne.join(Pt(),Pue.FOLDER_NAME,Pue.AGENTS_DIR);case"policySettings":return Lne.join(RR(),Pue.FOLDER_NAME,Pue.AGENTS_DIR);case"localSettings":return Lne.join(Pt(),Pue.FOLDER_NAME,Pue.AGENTS_DIR)}}
function Rwl(e){switch(e){case"projectSettings":return Lne.join(".",Pue.FOLDER_NAME,Pue.AGENTS_DIR);default:return TVn(e)}}
function owo(e){let t=TVn(e.source);return Lne.join(t,`${e.agentType}.md`)}
function SVn(e){if(e.source==="built-in")return"Built-in";if(e.source==="plugin")throw Error("Cannot get file path for plugin agents");let t=e.filename||e.agentType;if(e.baseDir)return Lne.join(e.baseDir,`${t}.md`);let n=TVn(e.source);return Lne.join(n,`${t}.md`)}
function xwl(e){if(e.source==="built-in")return"Built-in";let t=Rwl(e.source);return Lne.join(t,`${e.agentType}.md`)}
function kwl(e){if(isBuiltInAgent(e))return"Built-in";if(isPluginAgent(e))return`Plugin: ${e.plugin||"Unknown"}`;if(e.source==="flagSettings")return"CLI argument";let t=Rwl(e.source),n=e.filename||e.agentType;return Lne.join(t,`${n}.md`)}
async function lam(e){let t=TVn(e);return await jt().mkdir(t),t}
async function Hwl(e,t,n,r,o,s=!0,i,a,l,c){if(e==="built-in")throw Error("Cannot save built-in agents");await lam(e);let u=owo({source:e,agentType:t}),d=aam(t,n,r,o,i,a,l,c);try{await Pwl(u,d,s?"wx":"w")}catch(p){if(dn(p)==="EEXIST")throw Error(`Agent file already exists: ${u}`);throw p}}
async function Iwl(e,t){if(e.source==="built-in")throw Error("Cannot update built-in agents");let n=SVn(e),r=await dft.readFile(n,"utf-8"),{frontmatter:o,content:s}=RA(r,n),i={...o};if("tools"in t){let a=t.tools;if(a===void 0||a.length===1&&a[0]==="*")delete i.tools;else i.tools=a.join(", ")}if("color"in t)if(t.color)i.color=t.color;else delete i.color;if("model"in t)if(t.model)i.model=t.model;else delete i.model;await Pwl(n,`---
${z_n(i)}---
${s}`)}
async function Dwl(e){if(e.source==="built-in")throw Error("Cannot delete built-in agents");let t=SVn(e);try{await dft.unlink(t)}catch(n){if(dn(n)!=="ENOENT")throw n}}
async function Pwl(e,t,n="w"){let r=await dft.open(e,n);try{await r.writeFile(t,{encoding:"utf-8"}),await r.datasync()}finally{await r.close()}}
var dft,Lne;
var pft=b(()=>{h7();scrubPathsConfig();Go();sn();bt();Ev();ws();wwl();dft=require("fs/promises"),Lne=require("path")});
export {aam,TVn,Rwl,owo,SVn,xwl,kwl,lam,Hwl,Iwl,Dwl,Pwl,dft,Lne,pft};
