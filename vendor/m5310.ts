// @ts-nocheck
import {b,x} from "../runtime.ts";
import {lZ,q0} from "./m2270.ts";
import {ig} from "./m130.ts";
import {et} from "./m2261.ts";
import {Ni} from "./m127.ts";
function aKl(e){let t=!1;return ode.setState((n)=>{let r=n.open.filter((i)=>i.id!==e);if(r.length===n.open.length)return n;t=!0;let o=n.open.at(-1)?.id===e,s=r.at(-1);return{open:o&&s?[...r.slice(0,-1),{...s,swappedAt:Date.now()}]:r}}),t}
function j_t(){return ENo.useSyncExternalStore(ode.subscribe,lKl,lKl)}
function lKl(){return ode.getState().open.at(-1)??null}
function OGe(){return ENo.useSyncExternalStore(ode.subscribe,cKl,cKl)}
function cKl(){return ode.getState().open.length>0}
var ENo,ode,bNo,T9;
var NOe=b(()=>{lZ();ig();ENo=x(et(),1),ode=q0({open:[]}),bNo=Ni(),T9={getState:ode.getState,subscribe:ode.subscribe,onClosed:bNo.subscribe,open(e){ode.setState((t)=>{if(e.queueBehind&&t.open.length>0)return{open:[e,...t.open]};let n=t.open.length>0?{...e,swappedAt:Date.now()}:e;return{open:[...t.open,n]}})},update(e,t){ode.setState((n)=>{let r=n.open.findIndex((s)=>s.id===e);if(r===-1)return n;let o=n.open.slice();return o[r]={...n.open[r],payload:t},{open:o}})},answer(e,t){if(!aKl(e))return;bNo.emit({id:e,type:"answered",result:t})},dismiss(e){if(!aKl(e))return;bNo.emit({id:e,type:"dismissed"})},_resetForTests(){ode.setState(()=>({open:[]}))}}});
export {aKl,j_t,lKl,OGe,cKl,ENo,ode,bNo,T9,NOe};
