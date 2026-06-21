// @ts-nocheck
import {lr,readRoster} from "./m2547.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {Tn,zs} from "./m2554.ts";
import {VSo,ojt} from "./m4668.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function tWn(e){return[["Commands",e.commands.map((n)=>n.name)],["Agents",e.agents.map((n)=>n.name)],["Skills",e.skills.map((n)=>n.name)],["Hooks",e.hooks??[]],["MCP Servers",e.mcpServers??[]],["LSP Servers",e.lspServers??[]]].filter(([,n])=>n.length>0)}
function wDe(e){if(e.entry.source&&typeof e.entry.source==="object"&&"source"in e.entry.source&&e.entry.source.source==="github"&&typeof e.entry.source==="object"&&"repo"in e.entry.source)return e.entry.source.repo;return null}
function mmt(e,t){let n=[{label:"Install for you (user scope)",action:"install-user"},{label:"Install for all collaborators on this repository (project scope)",action:"install-project"},{label:"Install for you, in this repo only (local scope)",action:"install-local"}];if(e)n.push({label:"Open homepage",action:"homepage"});if(t)n.push({label:"View on GitHub",action:"github"});return n.push({label:"Back to plugin list",action:"back"}),n}
function wml(e){let t=pmt.c(12),{hasSelection:n,canToggle:r,canView:o}=e,s;if(t[0]!==n)s=n&&Vh.createElement(lr,{action:"plugin:install",context:"Plugin",fallback:"i",description:"install",bold:!0}),t[0]=n,t[1]=s;else s=t[1];let i;if(t[2]===Symbol.for("react.memo_cache_sentinel"))i=Vh.createElement(Text,null,"Type to search"),t[2]=i;else i=t[2];let a;if(t[3]!==r)a=r&&Vh.createElement(lr,{action:"plugin:toggle",context:"Plugin",fallback:"Space",description:"toggle"}),t[3]=r,t[4]=a;else a=t[4];let l;if(t[5]!==o)l=o&&Vh.createElement(lr,{action:"select:accept",context:"Select",fallback:"Enter",description:"view"}),t[5]=o,t[6]=l;else l=t[6];let c;if(t[7]===Symbol.for("react.memo_cache_sentinel"))c=Vh.createElement(lr,{action:"confirm:no",context:"Settings",fallback:"Esc",description:"go back"}),t[7]=c;else c=t[7];let u;if(t[8]!==s||t[9]!==a||t[10]!==l)u=Vh.createElement(Box,{marginTop:1},Vh.createElement(Text,{dimColor:!0,italic:!0},Vh.createElement(Tn,null,s,i,a,l,c))),t[8]=s,t[9]=a,t[10]=l,t[11]=u;else u=t[11];return u}
function rWn(e){let t=pmt.c(4),{pluginId:n}=e,r=Rml(n);if(!r?.last_updated)return null;let o;if(t[0]!==r.last_updated)o=TYp(r.last_updated),t[0]=r.last_updated,t[1]=o;else o=t[1];let s=o;if(s===void 0)return null;let i;if(t[2]!==s)i=Vh.createElement(Text,{dimColor:!0},"Last updated: ",s),t[2]=s,t[3]=i;else i=t[3];return i}
function Rml(e){let t=pmt.c(3),[n,r]=nWn.useState(null),o,s;if(t[0]!==e)o=()=>{r(null);let i=!1;return VSo(e).then((a)=>{if(!i)r(a??null)}).catch(yYp),()=>{i=!0}},s=[e],t[0]=e,t[1]=o,t[2]=s;else o=t[1],s=t[2];return nWn.useEffect(o,s),n}
function yYp(){}
function TYp(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return;return t.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}
function oWn(e){let t=pmt.c(4),{plugin:n}=e,r=Rml(n.pluginId),o;if(t[0]!==r||t[1]!==n.entry){let s=r?.components?tWn(r.components):[],i;if(t[3]===Symbol.for("react.memo_cache_sentinel"))i=Vh.createElement(Text,{bold:!0},"Will install:"),t[3]=i;else i=t[3];o=Vh.createElement(Box,{flexDirection:"column",marginBottom:1},i,s.length>0?s.map(SYp):Vh.createElement(bYp,{entry:n.entry})),t[0]=r,t[1]=n.entry,t[2]=o}else o=t[2];return o}
function SYp(e){let[t,n]=e;return Vh.createElement(Text,{key:t,dimColor:!0},"\xB7 ",t,": ",n.join(", "))}
function bYp(e){let t=pmt.c(11),{entry:n}=e,r,o;if(t[0]!==n.agents||t[1]!==n.commands||t[2]!==n.hooks||t[3]!==n.lspServers||t[4]!==n.mcpServers||t[5]!==n.skills||t[6]!==n.source){o=Symbol.for("react.early_return_sentinel");e:{let i=[["Commands",dmt(n.commands)],["Agents",dmt(n.agents)],["Skills",dmt(n.skills)],["Hooks",dmt(n.hooks)],["MCP Servers",dmt(n.mcpServers)],["LSP Servers",dmt(n.lspServers)]].filter(CYp);if(i.length===0){let a=typeof n.source==="object"?"\xB7 Component summary not available for remote plugin":"\xB7 Components will be discovered at installation",l;if(t[9]!==a)l=Vh.createElement(Text,{dimColor:!0},a),t[9]=a,t[10]=l;else l=t[10];o=l;break e}r=Vh.createElement(Vh.Fragment,null,i.map(EYp))}t[0]=n.agents,t[1]=n.commands,t[2]=n.hooks,t[3]=n.lspServers,t[4]=n.mcpServers,t[5]=n.skills,t[6]=n.source,t[7]=r,t[8]=o}else r=t[7],o=t[8];if(o!==Symbol.for("react.early_return_sentinel"))return o;return r}
function EYp(e){let[t,n]=e;return Vh.createElement(Text,{key:t,dimColor:!0},"\xB7 ",t,": ",n.join(", "))}
function CYp(e){let[,t]=e;return t.length>0}
function dmt(e){if(typeof e==="string")return[e];if(Array.isArray(e))return e.flatMap((t)=>typeof t==="string"?[t]:t&&typeof t==="object"?Object.keys(t):[]);if(e&&typeof e==="object")return Object.keys(e);return[]}
var pmt,Vh,nWn;
var JSo=b(()=>{readRoster();zs();ze();ojt();pmt=M(rt(),1),Vh=M(Te(),1),nWn=M(Te(),1)});
export {tWn,wDe,mmt,wml,rWn,Rml,yYp,TYp,oWn,SYp,bYp,EYp,CYp,dmt,pmt,Vh,nWn,JSo};
