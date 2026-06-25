// @ts-nocheck
import {b,x} from "../runtime.ts";
import {lZ,q0} from "./m2270.ts";
import {et} from "./m2261.ts";
function Ldt(){return J3t.useSyncExternalStore(TG.subscribe,()=>TG.getState().value)}
function h4a(){return J3t.useSyncExternalStore(TG.subscribe,()=>TG.getState().value==="")}
function A3n(){return TG.getState().value}
function R3n(e){TG.setState((t)=>{if(t.value===e)return t;if(t.launchWarning!==null&&t.value!==""&&e==="")return{...t,value:e,launchWarning:null};return{...t,value:e}})}
function Mdt(){return J3t.useSyncExternalStore(TG.subscribe,()=>TG.getState().active)}
function emo(e){TG.setState((t)=>t.active===e?t:{...t,active:e})}
function g4a(){return J3t.useSyncExternalStore(TG.subscribe,()=>TG.getState().launchWarning)}
function _4a(){return TG.getState().launchWarning}
function Eye(e){TG.setState((t)=>t.launchWarning?.type===e.type&&t.launchWarning.prefillLength===e.prefillLength?t:{...t,launchWarning:e})}
var J3t,TG;
var yce=b(()=>{lZ();J3t=x(et(),1),TG=q0({value:"",active:!1,launchWarning:null})});
export {Ldt,h4a,A3n,R3n,Mdt,emo,g4a,_4a,Eye,J3t,TG,yce};
