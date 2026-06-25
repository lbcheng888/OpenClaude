// @ts-nocheck
import {_t,gc,uo} from "./m2468.ts";
import {useTheme,gZ} from "./m2285.ts";
import {isInsideTmux,hte} from "./m3895.ts";
import {isTeammate,getAgentName,getTeamName,getTeammateColor,Op} from "../src/agent/1464_waitForTeammatesToBecomeIdle.ts";
import {isInProcessTeammate,b2} from "./m1462.ts";
import {IDe,v5t,w5t} from "./m4442.ts";
import {isInProcessEnabled,getCachedDetectionResult,sye} from "./m4227.ts";
import {T9t,wB} from "../src/config/3893_wB.ts";
import {j_e,eut,__,tL,ix} from "./m3842.ts";
import {Bdl,EVn} from "./m4507.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function Ger(){let e=_t((h)=>h.teamContext),t=_t((h)=>h.standaloneAgentContext),n=_t((h)=>h.agent);_t((h)=>h.viewingAgentTaskId);let r=gc(),[o]=useTheme(),[s,i]=fyt.useState(null),a=t?.prideGradient,l=fyt.useMemo(()=>a&&KYl?KYl(a,o):a,[a,o]);fyt.useEffect(()=>{isInsideTmux().then(i)},[]);let c=r.getState();if(isTeammate()&&!isInProcessTeammate()){let h=getAgentName();if(h&&getTeamName())return{text:`@${h}`,bgColor:Wer(e?.selfAgentColor??getTeammateColor())}}if(e?.teammates&&Object.keys(e.teammates).length>1){let h=IDe(c),g=Wer(h?.identity.color),_=isInProcessEnabled(),T=getCachedDetectionResult()?.isNative??!1;if(s===!1&&!_&&!T)return{text:`View teammates: \`tmux -L ${T9t()} a\``,bgColor:g};if((s===!0||_||T)&&h)return{text:`@${h.identity.agentName}`,bgColor:g}}let d=v5t(c);if(d.type==="named_agent"){let h=d.task,g;for(let[_,T]of c.agentNameRegistry)if(T===h.id){g=_;break}return{text:g?`@${g}`:h.description,bgColor:j_e(h.agentType)??"cyan_FOR_SUBAGENTS_ONLY"}}let p=n?c.agentDefinitions.activeAgents.find((h)=>h.agentType===n):void 0,m=Bdl(c),f=t?.color;if(m||f||l)return{text:m||n||"",bgColor:Wer(eut({userOverride:f,agentDefinitionColor:p?.color})),gradient:l};if(n)return{text:n,bgColor:Wer(p?.color,"promptBorder")};return null}
function Wer(e,t="cyan_FOR_SUBAGENTS_ONLY"){return e&&__.includes(e)?tL[e]:t}
var fyt,KYl=void 0;
var XFo=b(()=>{uo();w5t();ix();EVn();hte();sye();wB();Op();b2();gZ();fyt=x(et(),1)});
export {Ger,Wer,fyt,KYl,XFo};
