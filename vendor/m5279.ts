// @ts-nocheck
import {mt,configProtoStore} from "./m2458.ts";
import {getCaps,lt} from "../src/session/0131_sent.ts";
import {transcriptCursorEnd,isLoggableMessage,collectReplIds,recordTranscript,cleanMessagesForLogging,isChainParticipant,ja} from "../src/permissions/5143_writeRemoteAgentMetadata.ts";
import {isAgentSwarmsEnabled,cb} from "../src/config/3298_isAgentSwarmsEnabled.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function A3l(e,t=!1,n=!1){let r=mt((p)=>p.teamContext),o=zJ.useRef(0),s=zJ.useRef(void 0),i=zJ.useRef(void 0),a=zJ.useRef(void 0),l=zJ.useRef(!0),c=zJ.useRef(0),u=zJ.useRef(new Set),d=zJ.useRef(0);zJ.useEffect(()=>{SRm?.initSessionLog()},[]),zJ.useEffect(()=>{if(getCaps().transcriptSource==="ccr-api")return;if(t){d.current=e.length;return}let p=e[0]?.uuid,m=o.current,f=i.current===void 0,A=m===0||e[m-1]?.uuid===a.current||!l.current&&m===e.length,h=p!==void 0&&!f&&p===i.current&&m<=e.length&&A,g=p!==void 0&&!f&&p===i.current&&m>e.length,_=h?m:0,y=h||f?d.current:_,T=transcriptCursorEnd(e,Math.max(_,y),n);if(!h)d.current=T;let S=e[T-1];if(a.current=S?.uuid,l.current=S===void 0||isLoggableMessage(S),T===_)return;let v=_===0&&T===e.length?e:e.slice(_,T),R=h?s.current:void 0;if(_===0)u.current.clear();collectReplIds(v,u.current);let k=++c.current,x=r?.selfAgentName;if(recordTranscript(v,isAgentSwarmsEnabled()&&x?{teamName:r?.teamName,agentName:x}:{},R,u.current).then((H)=>{if(k!==c.current)return;if(H&&!h)s.current=H}),h||f||g){let H=cleanMessagesForLogging(v,u.current).findLast(isChainParticipant);if(H)s.current=H.uuid}o.current=T,i.current=p},[e,t,n,r?.teamName,r?.selfAgentName])}
var zJ,SRm=null;
var h3l=b(()=>{lt();configProtoStore();cb();ja();zJ=M(Te(),1)});
export {A3l,zJ,SRm,h3l};
