// @ts-nocheck
import {_t,uo} from "./m2468.ts";
import {iRo,aRo} from "./m4564.ts";
import {bytesPerTokenForModel,Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {Sn,lr} from "./m233.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function uEl(e){let t=cEl.c(17),{plugin:n}=e,r=_t(lsm),o=_t(asm),s=_t(ism),i;if(t[0]!==o||t[1]!==s||t[2]!==n.manifest.name||t[3]!==r){let f=iRo([...r,...o],bytesPerTokenForModel(s??void 0)),h;if(t[5]!==n.manifest.name)h=(g)=>g.pluginName===n.manifest.name,t[5]=n.manifest.name,t[6]=h;else h=t[6];i=f.byPlugin.find(h),t[0]=o,t[1]=s,t[2]=n.manifest.name,t[3]=r,t[4]=i}else i=t[4];let a=i,l;if(t[7]!==n.manifest.name)l=uP.jsxs(Text,{bold:!0,children:[n.manifest.name," \xB7 Usage"]}),t[7]=n.manifest.name,t[8]=l;else l=t[8];let c,u;if(t[9]===Symbol.for("react.memo_cache_sentinel"))c=uP.jsx(Text,{bold:!0,children:"Skill-listing footprint"}),u=uP.jsx(Text,{dimColor:!0,wrap:"wrap",children:"What this plugin's skill descriptions add to the system prompt (cached input after the first turn). Agents and MCP tools not yet counted."}),t[9]=c,t[10]=u;else c=t[9],u=t[10];let d;if(t[11]!==a)d=uP.jsxs(Box,{flexDirection:"column",children:[c,u,a&&a.skills.length>0?uP.jsxs(Box,{flexDirection:"column",marginTop:1,children:[a.skills.map(ssm),uP.jsxs(Box,{flexDirection:"row",marginTop:1,children:[uP.jsx(Box,{width:32,children:uP.jsx(Text,{children:"Total"})}),uP.jsxs(Text,{children:[a.skillCount," ",Sn(a.skillCount,"skill")," \xB7 ~",a.approxTokens," tok/turn"]})]})]}):uP.jsx(Text,{dimColor:!0,children:"No model-invocable skills loaded for this plugin"})]}),t[11]=a,t[12]=d;else d=t[12];let p;if(t[13]===Symbol.for("react.memo_cache_sentinel"))p=uP.jsx(Box,{flexDirection:"column",children:uP.jsx(Text,{dimColor:!0,wrap:"wrap",children:"For per-skill invocation counts and cost attribution, see /usage"})}),t[13]=p;else p=t[13];let m;if(t[14]!==l||t[15]!==d)m=uP.jsxs(Box,{flexDirection:"column",gap:1,children:[l,d,p]}),t[14]=l,t[15]=d,t[16]=m;else m=t[16];return m}
function ssm(e){return uP.jsxs(Box,{flexDirection:"row",children:[uP.jsx(Box,{width:32,children:uP.jsxs(Text,{dimColor:!0,children:["/",e.name]})}),uP.jsxs(Text,{dimColor:!0,children:["~",e.approxTokens," tok/turn"]})]},e.name)}
function ism(e){return e.mainLoopModel}
function asm(e){return e.mcp.commands}
function lsm(e){return e.plugins.commands}
var cEl,uP;
var dEl=b(()=>{je();uo();Ro();lr();aRo();cEl=x(tt(),1),uP=x(oe(),1)});
export {uEl,ssm,ism,asm,lsm,cEl,uP,dEl};
