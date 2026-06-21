// @ts-nocheck
import {bo,configProtoStore} from "./m2458.ts";
import {SVn,Iwl,pft} from "./m4940.ts";
import {RG,q9} from "./m4604.ts";
import {isCustomAgent,isPluginAgent,getActiveAgentsFromList,scrubPathsConfig} from "../src/permissions/4454_toAgentInfos.ts";
import {OHe,K0} from "./m3824.ts";
import {_t,cu} from "./m582.ts";
import {Or,Ts} from "./m2542.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {vVn,cwo} from "./m4945.ts";
import {et,Ai} from "./m2208.ts";
import {nl,v_} from "./m2573.ts";
import {CVn,lwo} from "./m4944.ts";
import {bVn,iwo} from "./m4942.ts";
import {EVn,awo} from "./m4943.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function Uwl({agent:e,tools:t,onSaved:n,onBack:r}){let o=bo(),[s,i]=xJ.useState("menu"),[a,l]=xJ.useState(0),[c,u]=xJ.useState(null),[d,p]=xJ.useState(e.color),m=xJ.useCallback(async()=>{let y=SVn(e),T=await RG(y);if(T.error)u(T.error);else n(`Opened ${e.agentType} in editor. If you made edits, restart to load the latest version.`)},[e,n]),f=xJ.useCallback(async(y={})=>{let{tools:T,color:S,model:v}=y,R=S??d,k="tools"in y&&!Sam(T,e.tools),x=v!==void 0,H=R!==e.color;if(!k&&!x&&!H)return!1;try{if(!isCustomAgent(e)&&!isPluginAgent(e))return!1;if(await Iwl(e,{...k&&{tools:T},...H&&{color:R},...x&&{model:v}}),H&&R)OHe(e.agentType,R);return o((I)=>{let P=I.agentDefinitions.allAgents.map((L)=>L.agentType===e.agentType&&L.source===e.source?{...L,tools:k?T:L.tools,color:R,model:v??L.model}:L);return{...I,agentDefinitions:{...I.agentDefinitions,activeAgents:getActiveAgentsFromList(P),allAgents:P}}}),n(`Updated agent: ${_t.bold(e.agentType)}`),!0}catch(I){return u(I instanceof Error?I.message:"Failed to save agent"),!1}},[e,d,n,o]),A=xJ.useMemo(()=>[{label:"Open in editor",action:m},{label:"Edit tools",action:()=>i("edit-tools")},{label:"Edit model",action:()=>i("edit-model")},{label:"Edit color",action:()=>i("edit-color")}],[m]),h=xJ.useCallback(()=>{if(u(null),s==="menu")r();else i("menu")},[s,r]),g=xJ.useCallback((y)=>{if(y.key==="up")y.preventDefault(),l((T)=>Math.max(0,T-1));else if(y.key==="down")y.preventDefault(),l((T)=>Math.min(A.length-1,T+1));else if(y.key==="return"){y.preventDefault();let T=A[a];if(T)T.action()}},[A,a]);Or("confirm:no",h,{context:"Confirmation"});let _=()=>YP.createElement(Box,{flexDirection:"column",tabIndex:0,autoFocus:!0,onKeyDown:g},YP.createElement(Text,{dimColor:!0},"Source: ",vVn(e.source)),YP.createElement(Box,{marginTop:1,flexDirection:"column"},A.map((y,T)=>YP.createElement(Text,{key:y.label,color:T===a?"suggestion":void 0},T===a?`${et.pointer} `:"  ",y.label))),c&&YP.createElement(Box,{marginTop:1},YP.createElement(nl,{error:c})));switch(s){case"menu":return _();case"edit-tools":return YP.createElement(CVn,{tools:t,initialTools:e.tools,onComplete:async(y)=>{i("menu"),await f({tools:y})}});case"edit-color":return YP.createElement(bVn,{agentName:e.agentType,currentColor:d||e.color||"automatic",onConfirm:async(y)=>{p(y),i("menu"),await f({color:y})}});case"edit-model":return YP.createElement(EVn,{initialModel:e.model,onComplete:async(y)=>{i("menu"),await f({model:y})}});default:return null}}
function Sam(e,t){if(!e||e.includes("*"))return!t||t.includes("*");if(!t||t.includes("*"))return!1;if(e.length!==t.length)return!1;let n=new Set(e);return t.every((r)=>n.has(r))}
var YP,xJ;
var $wl=b(()=>{cu();Ai();configProtoStore();ze();Ts();K0();scrubPathsConfig();q9();v_();pft();iwo();awo();lwo();cwo();YP=M(Te(),1),xJ=M(Te(),1)});
export {Uwl,Sam,YP,xJ,$wl};
