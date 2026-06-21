// @ts-nocheck
import {b} from "../runtime.ts";
function p4d(e){let t=e.toLowerCase().split("+").map((s)=>s.trim()).filter(Boolean),n=[],r=[];for(let s of t){let i=c4d[s];if(i!==void 0)n.push(i);else r.push(s)}let o=[...new Set(n)];return o.sort((s,i)=>Yta.indexOf(s)-Yta.indexOf(i)),{mods:o,keys:r}}
function jHn(e,t){let n=t==="darwin"?u4d:d4d,{mods:r,keys:o}=p4d(e),s=r.length>0?r.join("+")+"+":"";if(o.length===0)return n.has(r.join("+"));for(let i of o)if(n.has(s+i))return!0;return!1}
var c4d,Yta,u4d,d4d;
var Jta=b(()=>{c4d={meta:"meta",super:"meta",command:"meta",cmd:"meta",windows:"meta",win:"meta",ctrl:"ctrl",control:"ctrl",lctrl:"ctrl",lcontrol:"ctrl",rctrl:"ctrl",rcontrol:"ctrl",shift:"shift",lshift:"shift",rshift:"shift",alt:"alt",option:"alt"},Yta=["ctrl","alt","shift","meta"],u4d=new Set(["meta+q","shift+meta+q","alt+meta+escape","meta+tab","meta+space","ctrl+meta+q"]),d4d=new Set(["ctrl+alt+delete","alt+f4","alt+tab","meta+l","meta+d"])});
export {p4d,jHn,c4d,Yta,u4d,d4d,Jta};
