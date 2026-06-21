// @ts-nocheck
import {b} from "../runtime.ts";
function L4t(e){if(!e||e.target<=0)return-1;return Math.floor(20*e.spent/e.target)}
function M4t(e){if(!e||e.length===0)return"";return e.map((t)=>`${t.id??t.label}:${t.doneAt??"-"}:${t.failed?"x":""}`).join("|")}
function npt(){return{tasks:O4t.tasks,queued:O4t.queued,kinds:O4t.kinds}}
function eZa(e){O4t=e}
function t6n(){return{...O4t}}
var O4t;
var n6n=b(()=>{O4t={tasks:0,queued:0,kinds:[],items:[]}});
export {L4t,M4t,npt,eZa,t6n,O4t,n6n};
