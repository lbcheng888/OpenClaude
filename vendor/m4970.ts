// @ts-nocheck
import {or,dn} from "../src/config/0137_namespace.ts";
import {Lue,$Pl} from "./m4969.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {Fv,qK} from "./m709.ts";
import {isBuiltInAgent,isPluginAgent,kg} from "../src/permissions/4476_toAgentInfos.ts";
import {Wt,ps} from "./m230.ts";
import {cn,Ct} from "./m197.ts";
import {xf,Ibn,HA} from "./m2219.ts";
import {b} from "../runtime.ts";
function Tgm(e,t,n,r,o,s,i,a){let l=t.replaceAll("\\","\\\\").replaceAll('"',"\\\"").replaceAll(`
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
function lYn(e){switch(e){case"flagSettings":throw Error(`Cannot get directory path for ${e} agents`);case"userSettings":return Hne.join(or(),Lue.AGENTS_DIR);case"projectSettings":return Hne.join(isTmuxControlMode(),Lue.FOLDER_NAME,Lue.AGENTS_DIR);case"policySettings":return Hne.join(Fv(),Lue.FOLDER_NAME,Lue.AGENTS_DIR);case"localSettings":return Hne.join(isTmuxControlMode(),Lue.FOLDER_NAME,Lue.AGENTS_DIR)}}
function qPl(e){switch(e){case"projectSettings":return Hne.join(".",Lue.FOLDER_NAME,Lue.AGENTS_DIR);default:return lYn(e)}}
function T0o(e){let t=lYn(e.source);return Hne.join(t,`${e.agentType}.md`)}
function cYn(e){if(e.source==="built-in")return"Built-in";if(e.source==="plugin")throw Error("Cannot get file path for plugin agents");let t=e.filename||e.agentType;if(e.baseDir)return Hne.join(e.baseDir,`${t}.md`);let n=lYn(e.source);return Hne.join(n,`${t}.md`)}
function WPl(e){if(e.source==="built-in")return"Built-in";let t=qPl(e.source);return Hne.join(t,`${e.agentType}.md`)}
function GPl(e){if(isBuiltInAgent(e))return"Built-in";if(isPluginAgent(e))return`Plugin: ${e.plugin||"Unknown"}`;if(e.source==="flagSettings")return"CLI argument";let t=qPl(e.source),n=e.filename||e.agentType;return Hne.join(t,`${n}.md`)}
async function Sgm(e){let t=lYn(e);return await Wt().mkdir(t),t}
async function VPl(e,t,n,r,o,s=!0,i,a,l,c){if(e==="built-in")throw Error("Cannot save built-in agents");await Sgm(e);let u=T0o({source:e,agentType:t}),d=Tgm(t,n,r,o,i,a,l,c);try{await jPl(u,d,s?"wx":"w")}catch(p){if(cn(p)==="EEXIST")throw Error(`Agent file already exists: ${u}`);throw p}}
async function KPl(e,t){if(e.source==="built-in")throw Error("Cannot update built-in agents");let n=cYn(e),r=await Agt.readFile(n,"utf-8"),{frontmatter:o,content:s}=xf(r,n),i={...o};if("tools"in t){let a=t.tools;if(a===void 0||a.length===1&&a[0]==="*")delete i.tools;else i.tools=a.join(", ")}if("color"in t)if(t.color)i.color=t.color;else delete i.color;if("model"in t)if(t.model)i.model=t.model;else delete i.model;await jPl(n,`---
${Ibn(i)}---
${s}`)}
async function zPl(e){if(e.source==="built-in")throw Error("Cannot delete built-in agents");let t=cYn(e);try{await Agt.unlink(t)}catch(n){if(cn(n)!=="ENOENT")throw n}}
async function jPl(e,t,n="w"){let r=await Agt.open(e,n);try{await r.writeFile(t,{encoding:"utf-8"}),await r.datasync()}finally{await r.close()}}
var Agt,Hne;
var Rgt=b(()=>{qK();kg();Po();dn();Ct();HA();ps();$Pl();Agt=require("fs/promises"),Hne=require("path")});
export {Tgm,lYn,qPl,T0o,cYn,WPl,GPl,Sgm,VPl,KPl,zPl,jPl,Agt,Hne,Rgt};
