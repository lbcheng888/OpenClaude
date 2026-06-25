// @ts-nocheck
import {cne,gRo} from "./m4569.ts";
import {bt,Gc} from "./m588.ts";
import {b} from "../runtime.ts";
function NQp(e){let t=e.map((n)=>n.messageCount).filter((n)=>n>0).sort((n,r)=>n-r);if(t.length===0)return null;return{p25:t[Math.floor(t.length*0.25)],p50:t[Math.floor(t.length*0.5)],p75:t[Math.floor(t.length*0.75)]}}
function _Ro(e,t={}){let{terminalWidth:n=80,showMonthLabels:r=!0}=t,o=4,s=n-4,i=Math.min(52,Math.max(10,s)),a=new Map;for(let T of e)a.set(T.date,T);let l=NQp(e),c=new Date;c.setHours(0,0,0,0);let u=new Date(c);u.setDate(c.getDate()-c.getDay());let d=new Date(u);d.setDate(d.getDate()-(i-1)*7);let p=Array.from({length:7},()=>Array(i).fill("")),m=[],f=-1,h=new Date(d);for(let T=0;T<i;T++)for(let y=0;y<7;y++){if(h>c){p[y][T]=" ",h.setDate(h.getDate()+1);continue}let S=cne(h),E=a.get(S);if(y===0){let w=h.getMonth();if(w!==f)m.push({month:w,week:T}),f=w}let R=FQp(E?.messageCount||0,l);p[y][T]=BQp(R),h.setDate(h.getDate()+1)}let g=[];if(r){let T=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],y=m.map((R)=>R.month),S=Math.floor(i/Math.max(y.length,1)),E=y.map((R)=>T[R].padEnd(S)).join("");g.push("    "+E)}let _=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];for(let T=0;T<7;T++){let S=([1,3,5].includes(T)?_[T].padEnd(3):"   ")+" "+p[T].join("");g.push(S)}return g.push(""),g.push("    Less "+[aPe("\u2591"),aPe("\u2592"),aPe("\u2593"),aPe("\u2588")].join(" ")+" More"),g.join(`
`)}
function FQp(e,t){if(e===0||!t)return 0;if(e>=t.p75)return 4;if(e>=t.p50)return 3;if(e>=t.p25)return 2;return 1}
function BQp(e){switch(e){case 0:return bt.gray("\xB7");case 1:return aPe("\u2591");case 2:return aPe("\u2592");case 3:return aPe("\u2593");case 4:return aPe("\u2588");default:return bt.gray("\xB7")}}
var aPe;
var ihl=b(()=>{Gc();gRo();aPe=bt.hex("#da7756")});
export {NQp,_Ro,FQp,BQp,aPe,ihl};
