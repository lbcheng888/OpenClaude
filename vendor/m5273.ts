// @ts-nocheck
import {b,M} from "../runtime.ts";
import {kg} from "./m129.ts";
import {Te} from "./m2253.ts";
import {C0} from "./m2262.ts";
import {ca} from "./m5.ts";
function Z9l(e){let t=!1;return Que.setState((n)=>{let r=n.open.filter((o)=>o.id!==e);if(r.length===n.open.length)return n;return t=!0,{open:r}}),t}
function IAt(){return YDo.useSyncExternalStore(Que.subscribe,e3l,e3l)}
function e3l(){return Que.getState().open.at(-1)??null}
function $8e(){return YDo.useSyncExternalStore(Que.subscribe,t3l,t3l)}
function t3l(){return Que.getState().open.length>0}
var YDo,Que,zDo,Q9;
var FPe=b(()=>{kg();YDo=M(Te(),1),Que=C0({open:[]}),zDo=ca(),Q9={getState:Que.getState,subscribe:Que.subscribe,onClosed:zDo.subscribe,open(e){Que.setState((t)=>({open:[...t.open,e]}))},update(e,t){Que.setState((n)=>{let r=n.open.findIndex((s)=>s.id===e);if(r===-1)return n;let o=n.open.slice();return o[r]={...n.open[r],payload:t},{open:o}})},answer(e,t){if(!Z9l(e))return;zDo.emit({id:e,type:"answered",result:t})},dismiss(e){if(!Z9l(e))return;zDo.emit({id:e,type:"dismissed"})},_resetForTests(){Que.setState(()=>({open:[]}))}}});
export {Z9l,IAt,e3l,$8e,t3l,YDo,Que,zDo,Q9,FPe};
