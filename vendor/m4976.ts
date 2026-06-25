// @ts-nocheck
import {bo,uo} from "./m2468.ts";
import {cYn,KPl,Rgt} from "./m4970.ts";
import {GG,d9} from "./m4632.ts";
import {isCustomAgent,isPluginAgent,getActiveAgentsFromList,kg} from "../src/permissions/4476_toAgentInfos.ts";
import {E0e,ix} from "./m3842.ts";
import {bt,Gc} from "./m588.ts";
import {Or,ss} from "./m2553.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {fYn,A0o} from "./m4975.ts";
import {Xe,Zs} from "./m2216.ts";
import {Ba,I_} from "./m2584.ts";
import {mYn,C0o} from "./m4974.ts";
import {uYn,b0o} from "./m4972.ts";
import {dYn,E0o} from "./m4973.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function rOl({agent:e,tools:t,onSaved:n,onBack:r}){let o=bo(),[s,i]=TJ.useState("menu"),[a,l]=TJ.useState(0),[c,u]=TJ.useState(null),[d,p]=TJ.useState(e.color),m=TJ.useCallback(async()=>{let y=cYn(e),S=await GG(y);if(S.error)u(S.error);else n(`Opened ${e.agentType} in editor. If you made edits, restart to load the latest version.`)},[e,n]),f=TJ.useCallback(async(y={})=>{let{tools:S,color:E,model:R}=y,w=E??d,H="tools"in y&&!Pgm(S,e.tools),k=R!==void 0,I=w!==e.color;if(!H&&!k&&!I)return!1;try{if(!isCustomAgent(e)&&!isPluginAgent(e))return!1;if(await KPl(e,{...H&&{tools:S},...I&&{color:w},...k&&{model:R}}),I&&w)E0e(e.agentType,w);return o((D)=>{let O=D.agentDefinitions.allAgents.map((L)=>L.agentType===e.agentType&&L.source===e.source?{...L,tools:H?S:L.tools,color:w,model:R??L.model}:L);return{...D,agentDefinitions:{...D.agentDefinitions,activeAgents:getActiveAgentsFromList(O),allAgents:O}}}),n(`Updated agent: ${bt.bold(e.agentType)}`),!0}catch(D){return u(D instanceof Error?D.message:"Failed to save agent"),!1}},[e,d,n,o]),h=TJ.useMemo(()=>[{label:"Open in editor",action:m},{label:"Edit tools",action:()=>i("edit-tools")},{label:"Edit model",action:()=>i("edit-model")},{label:"Edit color",action:()=>i("edit-color")}],[m]),g=TJ.useCallback(()=>{if(u(null),s==="menu")r();else i("menu")},[s,r]),_=TJ.useCallback((y)=>{if(y.key==="up")y.preventDefault(),l((S)=>Math.max(0,S-1));else if(y.key==="down")y.preventDefault(),l((S)=>Math.min(h.length-1,S+1));else if(y.key==="return"){y.preventDefault();let S=h[a];if(S)S.action()}},[h,a]);Or("confirm:no",g,{context:"Confirmation"});let T=()=>xne.jsxs(Box,{flexDirection:"column",tabIndex:0,autoFocus:!0,onKeyDown:_,children:[xne.jsxs(Text,{dimColor:!0,children:["Source: ",fYn(e.source)]}),xne.jsx(Box,{marginTop:1,flexDirection:"column",children:h.map((y,S)=>xne.jsxs(Text,{color:S===a?"suggestion":void 0,children:[S===a?`${Xe.pointer} `:"  ",y.label]},y.label))}),c&&xne.jsx(Box,{marginTop:1,children:xne.jsx(Ba,{error:c})})]});switch(s){case"menu":return T();case"edit-tools":return xne.jsx(mYn,{tools:t,initialTools:e.tools,onComplete:async(y)=>{i("menu"),await f({tools:y})}});case"edit-color":return xne.jsx(uYn,{agentName:e.agentType,currentColor:d||e.color||"automatic",onConfirm:async(y)=>{p(y),i("menu"),await f({color:y})}});case"edit-model":return xne.jsx(dYn,{initialModel:e.model,onComplete:async(y)=>{i("menu"),await f({model:y})}});default:return null}}
function Pgm(e,t){if(!e||e.includes("*"))return!t||t.includes("*");if(!t||t.includes("*"))return!1;if(e.length!==t.length)return!1;let n=new Set(e);return t.every((r)=>n.has(r))}
var TJ,xne;
var oOl=b(()=>{Gc();Zs();uo();je();ss();ix();kg();d9();I_();Rgt();b0o();E0o();C0o();A0o();TJ=x(et(),1),xne=x(oe(),1)});
export {rOl,Pgm,TJ,xne,oOl};
