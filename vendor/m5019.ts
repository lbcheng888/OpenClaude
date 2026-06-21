// @ts-nocheck
import {y0t,E$,FZ} from "../src/telemetry/2465_bindings.ts";
import {yEn,TEn,k$} from "./m2541.ts";
import {WR} from "./m2207.ts";
import {getDefaultAppState,kke} from "./m3301.ts";
import {hat,_He} from "./m3752.ts";
import {AppStateProvider,Jq} from "./m3354.ts";
import {Qje,Ujt} from "../src/tui/4815_current.ts";
import {Ec} from "./m2449.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function $cm({children:e}){let{bindings:t}=y0t(E$),n=Bne.useRef(null),r=Bne.useRef(new Map),o=Bne.useRef(new Set),s=Bne.useRef(new Set).current,i=Bne.useRef(yEn());return Bne.default.createElement(TEn,{bindings:t,pendingChordRef:n,pendingChord:null,setPendingChord:()=>{},activeContexts:s,registerActiveContext:()=>{},unregisterActiveContext:()=>{},handlerRegistryRef:r,preDispatchRef:o,keyHandlerRegistry:i.current},e)}
function qcm(e){for(let t of e)if(t.type==="assistant"){let n=t.message.model;if(n&&n!==WR)return n}return}
function jcm(e){if(!("message"in e))return 1;let t=e.message.content;return Array.isArray(t)?t.length:1}
async function Wcm(e,t,n,{columns:r,verbose:o=!1,chunkSize:s=40,onProgress:i}={}){let a=qcm(e),l=a?{...getDefaultAppState(),mainLoopModel:a}:void 0,c=(d)=>hat(Bne.default.createElement(AppStateProvider,{initialState:l},Bne.default.createElement($cm,null,Bne.default.createElement(Qje,{messages:e,tools:t,commands:[],verbose:o,toolJSX:null,inProgressToolUseIDs:new Set,isMessageSelectorVisible:!1,conversationId:"export",screen:"prompt",latchAnnouncementSlot:!1,streamingToolUses:[],showAllInTranscript:!0,isLoading:!1,renderRange:d,disableRenderCap:!0}))),r),u=s;for(let d of e)u+=jcm(d);for(let d=0;d<u;d+=s){let p=await c([d,d+s]);if(Ec(p).trim()==="")break;await n(p),i?.(d+s)}}
async function qVn(e,t=[],n){let r=[];return await Wcm(e,t,(o)=>void r.push(Ec(o)),{columns:n}),r.join("")}
var Bne;
var Gwo=b(()=>{Ujt();k$();FZ();Jq();kke();_He();Bne=M(Te(),1)});
export {$cm,qcm,jcm,Wcm,qVn,Bne,Gwo};
