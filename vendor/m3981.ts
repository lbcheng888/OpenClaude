// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
import {C0} from "./m2262.ts";
function Tct(){return l$t.useSyncExternalStore(XW.subscribe,()=>XW.getState().value)}
function V1a(){return l$t.useSyncExternalStore(XW.subscribe,()=>XW.getState().value==="")}
function UUn(){return XW.getState().value}
function $Un(e){XW.setState((t)=>{if(t.value===e)return t;if(t.launchWarning!==null&&t.value!==""&&e==="")return{...t,value:e,launchWarning:null};return{...t,value:e}})}
function Sct(){return l$t.useSyncExternalStore(XW.subscribe,()=>XW.getState().active)}
function hao(e){XW.setState((t)=>t.active===e?t:{...t,active:e})}
function K1a(){return l$t.useSyncExternalStore(XW.subscribe,()=>XW.getState().launchWarning)}
function z1a(){return XW.getState().launchWarning}
function t_e(e){XW.setState((t)=>t.launchWarning?.type===e.type&&t.launchWarning.prefillLength===e.prefillLength?t:{...t,launchWarning:e})}
var l$t,XW;
var Sce=b(()=>{l$t=M(Te(),1),XW=C0({value:"",active:!1,launchWarning:null})});
export {Tct,V1a,UUn,$Un,Sct,hao,K1a,z1a,t_e,l$t,XW,Sce};
