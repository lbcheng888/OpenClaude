// @ts-nocheck
import {b} from "../runtime.ts";
function a5t(e){if(!e||e.target<=0)return-1;return Math.floor(20*e.spent/e.target)}
function l5t(e){if(!e||e.length===0)return"";return e.map((t)=>{let n=`${t.id??t.label}:${t.doneAt??"-"}:${t.failed?"x":""}`;return t.kind==="todo"?`${n}:${t.startedAt??"-"}`:n}).join("|")}
function nft(){return{tasks:i5t.tasks,queued:i5t.queued,kinds:i5t.kinds}}
function Nsl(e){i5t=e}
function bWn(){return{...i5t}}
var i5t;
var EWn=b(()=>{i5t={tasks:0,queued:0,kinds:[],items:[]}});
export {a5t,l5t,nft,Nsl,bWn,i5t,EWn};
