// @ts-nocheck
import {mt,Mc,configProtoStore} from "./m2458.ts";
import {useTheme,SZ} from "./m2274.ts";
import {isInsideTmux,Tte} from "./m3877.ts";
import {isTeammate,getAgentName,getTeamName,getTeammateColor,Am} from "../src/agent/1459_waitForTeammatesToBecomeIdle.ts";
import {isInProcessTeammate,Q2} from "./m1457.ts";
import {O0e,eqt,tqt} from "./m4420.ts";
import {isInProcessEnabled,getCachedDetectionResult,VHe} from "./m4209.ts";
import {VUt,aU} from "../src/config/3875_aU.ts";
import {Dge,elt,i_,NL,K0} from "./m3824.ts";
import {Qol,t8n} from "./m4485.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function WJn(){let e=mt((A)=>A.teamContext),t=mt((A)=>A.standaloneAgentContext),n=mt((A)=>A.agent);mt((A)=>A.viewingAgentTaskId);let r=Mc(),[o]=useTheme(),[s,i]=JAt.useState(null),a=t?.prideGradient,l=JAt.useMemo(()=>a&&c8l?c8l(a,o):a,[a,o]);JAt.useEffect(()=>{isInsideTmux().then(i)},[]);let c=r.getState();if(isTeammate()&&!isInProcessTeammate()){let A=getAgentName();if(A&&getTeamName())return{text:`@${A}`,bgColor:jJn(e?.selfAgentColor??getTeammateColor())}}if(e?.teammates&&Object.keys(e.teammates).length>1){let A=O0e(c),h=jJn(A?.identity.color),g=isInProcessEnabled(),_=getCachedDetectionResult()?.isNative??!1;if(s===!1&&!g&&!_)return{text:`View teammates: \`tmux -L ${VUt()} a\``,bgColor:h};if((s===!0||g||_)&&A)return{text:`@${A.identity.agentName}`,bgColor:h}}let d=eqt(c);if(d.type==="named_agent"){let A=d.task,h;for(let[g,_]of c.agentNameRegistry)if(_===A.id){h=g;break}return{text:h?`@${h}`:A.description,bgColor:Dge(A.agentType)??"cyan_FOR_SUBAGENTS_ONLY"}}let p=n?c.agentDefinitions.activeAgents.find((A)=>A.agentType===n):void 0,m=Qol(c),f=t?.color;if(m||f||l)return{text:m||n||"",bgColor:jJn(elt({userOverride:f,agentDefinitionColor:p?.color})),gradient:l};if(n)return{text:n,bgColor:jJn(p?.color,"promptBorder")};return null}
function jJn(e,t="cyan_FOR_SUBAGENTS_ONLY"){return e&&i_.includes(e)?NL[e]:t}
var JAt,c8l=void 0;
var DOo=b(()=>{configProtoStore();tqt();K0();t8n();Tte();VHe();aU();Am();Q2();SZ();JAt=M(Te(),1)});
export {WJn,jJn,JAt,c8l,DOo};
