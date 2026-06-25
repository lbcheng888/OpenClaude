// @ts-nocheck
import {_t,uo} from "./m2468.ts";
import {getCaps,lt} from "../src/session/0132_sent.ts";
import {transcriptCursorEnd,isLoggableMessage,collectReplIds,recordTranscript,cleanMessagesForLogging,isChainParticipant,_a} from "../src/permissions/5175_writeRemoteAgentMetadata.ts";
import {isAgentSwarmsEnabled,lb} from "../src/config/3314_isAgentSwarmsEnabled.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function AKl(e,t=!1,n=!1){let r=_t((p)=>p.teamContext),o=FJ.useRef(0),s=FJ.useRef(void 0),i=FJ.useRef(void 0),a=FJ.useRef(void 0),l=FJ.useRef(!0),c=FJ.useRef(0),u=FJ.useRef(new Set),d=FJ.useRef(0);FJ.useEffect(()=>{JLm?.initSessionLog()},[]),FJ.useEffect(()=>{if(getCaps().transcriptSource==="ccr-api")return;if(t){d.current=e.length;return}let p=e[0]?.uuid,m=o.current,f=i.current===void 0,h=m===0||e[m-1]?.uuid===a.current||!l.current&&m===e.length,g=p!==void 0&&!f&&p===i.current&&m<=e.length&&h,_=p!==void 0&&!f&&p===i.current&&m>e.length,T=g?m:0,y=g||f?d.current:T,S=transcriptCursorEnd(e,Math.max(T,y),n);if(!g)d.current=S;let E=e[S-1];if(a.current=E?.uuid,l.current=E===void 0||isLoggableMessage(E),S===T)return;let R=T===0&&S===e.length?e:e.slice(T,S),w=g?s.current:void 0;if(T===0)u.current.clear();collectReplIds(R,u.current);let H=++c.current,k=r?.selfAgentName;if(recordTranscript(R,isAgentSwarmsEnabled()&&k?{teamName:r?.teamName,agentName:k}:{},w,u.current).then((I)=>{if(H!==c.current)return;if(I&&!g)s.current=I}),g||f||_){let I=cleanMessagesForLogging(R,u.current).findLast(isChainParticipant);if(I)s.current=I.uuid}o.current=S,i.current=p},[e,t,n,r?.teamName,r?.selfAgentName])}
var FJ,JLm=null;
var RKl=b(()=>{lt();uo();lb();_a();FJ=x(et(),1)});
export {AKl,FJ,JLm,RKl};
