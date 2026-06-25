// @ts-nocheck
import {dr,uc} from "./m2558.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {bn,Is} from "./m2565.ts";
import {iwo,RWt} from "./m4697.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function F7n(e){return[["Commands",e.commands.map((n)=>n.name)],["Agents",e.agents.map((n)=>n.name)],["Skills",e.skills.map((n)=>n.name)],["Hooks",e.hooks??[]],["MCP Servers",e.mcpServers??[]],["LSP Servers",e.lspServers??[]]].filter(([,n])=>n.length>0)}
function CPe(e){if(e.entry.source&&typeof e.entry.source==="object"&&"source"in e.entry.source&&e.entry.source.source==="github"&&typeof e.entry.source==="object"&&"repo"in e.entry.source)return e.entry.source.repo;return null}
function Cht(e,t){let n=[{label:"Install for you (user scope)",action:"install-user"},{label:"Install for all collaborators on this repository (project scope)",action:"install-project"},{label:"Install for you, in this repo only (local scope)",action:"install-local"}];if(e)n.push({label:"Open homepage",action:"homepage"});if(t)n.push({label:"View on GitHub",action:"github"});return n.push({label:"Back to plugin list",action:"back"}),n}
function ybl(e){let t=Eht.c(12),{hasSelection:n,canToggle:r,canView:o}=e,s;if(t[0]!==n)s=n&&CronDeleteToolName.jsx(dr,{action:"plugin:install",context:"Plugin",fallback:"i",description:"install",bold:!0}),t[0]=n,t[1]=s;else s=t[1];let i;if(t[2]===Symbol.for("react.memo_cache_sentinel"))i=CronDeleteToolName.jsx(Text,{children:"Type to search"}),t[2]=i;else i=t[2];let a;if(t[3]!==r)a=r&&CronDeleteToolName.jsx(dr,{action:"plugin:toggle",context:"Plugin",fallback:"Space",description:"toggle"}),t[3]=r,t[4]=a;else a=t[4];let l;if(t[5]!==o)l=o&&CronDeleteToolName.jsx(dr,{action:"select:accept",context:"Select",fallback:"Enter",description:"view"}),t[5]=o,t[6]=l;else l=t[6];let c;if(t[7]===Symbol.for("react.memo_cache_sentinel"))c=CronDeleteToolName.jsx(dr,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"go back"}),t[7]=c;else c=t[7];let u;if(t[8]!==s||t[9]!==a||t[10]!==l)u=CronDeleteToolName.jsx(Box,{marginTop:1,children:CronDeleteToolName.jsx(Text,{dimColor:!0,italic:!0,children:CronDeleteToolName.jsxs(bn,{children:[s,i,a,l,c]})})}),t[8]=s,t[9]=a,t[10]=l,t[11]=u;else u=t[11];return u}
function U7n(e){let t=Eht.c(4),{pluginId:n}=e,r=Tbl(n);if(!r?.last_updated)return null;let o;if(t[0]!==r.last_updated)o=Eom(r.last_updated),t[0]=r.last_updated,t[1]=o;else o=t[1];let s=o;if(s===void 0)return null;let i;if(t[2]!==s)i=CronDeleteToolName.jsxs(Text,{dimColor:!0,children:["Last updated: ",s]}),t[2]=s,t[3]=i;else i=t[3];return i}
function Tbl(e){let t=Eht.c(3),[n,r]=B7n.useState(null),o,s;if(t[0]!==e)o=()=>{r(null);let i=!1;return iwo(e).then((a)=>{if(!i)r(a??null)}).catch(bom),()=>{i=!0}},s=[e],t[0]=e,t[1]=o,t[2]=s;else o=t[1],s=t[2];return B7n.useEffect(o,s),n}
function bom(){}
function Eom(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return;return t.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}
function $7n(e){let t=Eht.c(4),{plugin:n}=e,r=Tbl(n.pluginId),o;if(t[0]!==r||t[1]!==n.entry){let s=r?.components?F7n(r.components):[],i;if(t[3]===Symbol.for("react.memo_cache_sentinel"))i=CronDeleteToolName.jsx(Text,{bold:!0,children:"Will install:"}),t[3]=i;else i=t[3];o=CronDeleteToolName.jsxs(Box,{flexDirection:"column",marginBottom:1,children:[i,s.length>0?s.map(Com):CronDeleteToolName.jsx(Aom,{entry:n.entry})]}),t[0]=r,t[1]=n.entry,t[2]=o}else o=t[2];return o}
function Com(e){let[t,n]=e;return CronDeleteToolName.jsxs(Text,{dimColor:!0,children:["\xB7 ",t,": ",n.join(", ")]},t)}
function Aom(e){let t=Eht.c(11),{entry:n}=e,r,o;if(t[0]!==n.agents||t[1]!==n.commands||t[2]!==n.hooks||t[3]!==n.lspServers||t[4]!==n.mcpServers||t[5]!==n.skills||t[6]!==n.source){o=Symbol.for("react.early_return_sentinel");e:{let i=[["Commands",bht(n.commands)],["Agents",bht(n.agents)],["Skills",bht(n.skills)],["Hooks",bht(n.hooks)],["MCP Servers",bht(n.mcpServers)],["LSP Servers",bht(n.lspServers)]].filter(vom);if(i.length===0){let a=typeof n.source==="object"?"\xB7 Component summary not available for remote plugin":"\xB7 Components will be discovered at installation",l;if(t[9]!==a)l=CronDeleteToolName.jsx(Text,{dimColor:!0,children:a}),t[9]=a,t[10]=l;else l=t[10];o=l;break e}r=CronDeleteToolName.jsx(CronDeleteToolName.Fragment,{children:i.map(Rom)})}t[0]=n.agents,t[1]=n.commands,t[2]=n.hooks,t[3]=n.lspServers,t[4]=n.mcpServers,t[5]=n.skills,t[6]=n.source,t[7]=r,t[8]=o}else r=t[7],o=t[8];if(o!==Symbol.for("react.early_return_sentinel"))return o;return r}
function Rom(e){let[t,n]=e;return CronDeleteToolName.jsxs(Text,{dimColor:!0,children:["\xB7 ",t,": ",n.join(", ")]},t)}
function vom(e){let[,t]=e;return t.length>0}
function bht(e){if(typeof e==="string")return[e];if(Array.isArray(e))return e.flatMap((t)=>typeof t==="string"?[t]:t&&typeof t==="object"?Object.keys(t):[]);if(e&&typeof e==="object")return Object.keys(e);return[]}
var Eht,B7n,CronDeleteToolName;
var dwo=b(()=>{uc();Is();je();RWt();Eht=x(tt(),1),B7n=x(et(),1),CronDeleteToolName=x(oe(),1)});
export {F7n,CPe,Cht,ybl,U7n,Tbl,bom,Eom,$7n,Com,Aom,Rom,vom,bht,Eht,B7n,CronDeleteToolName,dwo};
