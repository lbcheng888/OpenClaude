// @ts-nocheck
import {jPt,K2,MZ} from "../src/telemetry/2475_bindings.ts";
import {avn,lvn,Q2} from "./m2552.ts";
import {nw} from "./m2215.ts";
import {$W,gIe} from "./m3317.ts";
import {fct,i0e} from "./m3768.ts";
import {AppStateProvider,pq} from "./m3370.ts";
import {xWe,oGt} from "../src/tui/4847_current.ts";
import {cc} from "./m2459.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Zym({children:e}){let{bindings:t}=jPt(K2),n=Ugt.useRef(null),r=Ugt.useRef(new Map),o=Ugt.useRef(new Set),s=Ugt.useRef(new Set).current,i=Ugt.useRef(avn());return VGt.jsx(lvn,{bindings:t,pendingChordRef:n,pendingChord:null,setPendingChord:()=>{},activeContexts:s,registerActiveContext:()=>{},unregisterActiveContext:()=>{},handlerRegistryRef:r,preDispatchRef:o,keyHandlerRegistry:i.current,children:e})}
function eTm(e){for(let t of e)if(t.type==="assistant"){let n=t.message.model;if(n&&n!==nw)return n}return}
function tTm(e){if(!("message"in e))return 1;let t=e.message.content;return Array.isArray(t)?t.length:1}
async function nTm(e,t,n,{columns:r,verbose:o=!1,chunkSize:s=40,onProgress:i}={}){let a=eTm(e),l=a?{...$W(),mainLoopModel:a}:void 0,c=(d)=>fct(VGt.jsx(AppStateProvider,{initialState:l,children:VGt.jsx(Zym,{children:VGt.jsx(xWe,{messages:e,tools:t,commands:[],verbose:o,toolJSX:null,inProgressToolUseIDs:new Set,isMessageSelectorVisible:!1,conversationId:"export",screen:"prompt",latchAnnouncementSlot:!1,streamingToolUses:[],showAllInTranscript:!0,isLoading:!1,renderRange:d,disableRenderCap:!0})})}),r),u=s;for(let d of e)u+=tTm(d);for(let d=0;d<u;d+=s){let p=await c([d,d+s]);if(cc(p).trim()==="")break;await n(p),i?.(d+s)}}
async function LYn(e,t=[],n){let r=[];return await nTm(e,t,(o)=>void r.push(cc(o)),{columns:n}),r.join("")}
var Ugt,VGt;
var nxo=b(()=>{oGt();Q2();MZ();pq();gIe();i0e();Ugt=x(et(),1),VGt=x(oe(),1)});
export {Zym,eTm,tTm,nTm,LYn,Ugt,VGt,nxo};
