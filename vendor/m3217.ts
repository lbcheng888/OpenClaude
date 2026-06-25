// @ts-nocheck
import {b} from "../runtime.ts";
function Xzd(e){let t=e.toLowerCase().split("+").map((s)=>s.trim()).filter(Boolean),n=[],r=[];for(let s of t){let i=jzd[s];if(i!==void 0)n.push(i);else r.push(s)}let o=[...new Set(n)];return o.sort((s,i)=>eca.indexOf(s)-eca.indexOf(i)),{mods:o,keys:r}}
function ODn(e,t){let n=t==="darwin"?Yzd:Jzd,{mods:r,keys:o}=Xzd(e),s=r.length>0?r.join("+")+"+":"";if(o.length===0)return n.has(r.join("+"));for(let i of o)if(n.has(s+i))return!0;return!1}
var jzd,eca,Yzd,Jzd;
var tca=b(()=>{jzd={meta:"meta",super:"meta",command:"meta",cmd:"meta",windows:"meta",win:"meta",ctrl:"ctrl",control:"ctrl",lctrl:"ctrl",lcontrol:"ctrl",rctrl:"ctrl",rcontrol:"ctrl",shift:"shift",lshift:"shift",rshift:"shift",alt:"alt",option:"alt"},eca=["ctrl","alt","shift","meta"],Yzd=new Set(["meta+q","shift+meta+q","alt+meta+escape","meta+tab","meta+space","ctrl+meta+q"]),Jzd=new Set(["ctrl+alt+delete","alt+f4","alt+tab","meta+l","meta+d"])});
export {Xzd,ODn,jzd,eca,Yzd,Jzd,tca};
