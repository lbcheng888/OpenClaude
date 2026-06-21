// @ts-nocheck
import {_ne,oTo} from "./m4541.ts";
import {_t,cu} from "./m582.ts";
import {b} from "../runtime.ts";
function IWp(e){let t=e.map((n)=>n.messageCount).filter((n)=>n>0).sort((n,r)=>n-r);if(t.length===0)return null;return{p25:t[Math.floor(t.length*0.25)],p50:t[Math.floor(t.length*0.5)],p75:t[Math.floor(t.length*0.75)]}}
function sTo(e,t={}){let{terminalWidth:n=80,showMonthLabels:r=!0}=t,o=4,s=n-4,i=Math.min(52,Math.max(10,s)),a=new Map;for(let _ of e)a.set(_.date,_);let l=IWp(e),c=new Date;c.setHours(0,0,0,0);let u=new Date(c);u.setDate(c.getDate()-c.getDay());let d=new Date(u);d.setDate(d.getDate()-(i-1)*7);let p=Array.from({length:7},()=>Array(i).fill("")),m=[],f=-1,A=new Date(d);for(let _=0;_<i;_++)for(let y=0;y<7;y++){if(A>c){p[y][_]=" ",A.setDate(A.getDate()+1);continue}let T=_ne(A),S=a.get(T);if(y===0){let R=A.getMonth();if(R!==f)m.push({month:R,week:_}),f=R}let v=DWp(S?.messageCount||0,l);p[y][_]=PWp(v),A.setDate(A.getDate()+1)}let h=[];if(r){let _=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],y=m.map((v)=>v.month),T=Math.floor(i/Math.max(y.length,1)),S=y.map((v)=>_[v].padEnd(T)).join("");h.push("    "+S)}let g=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];for(let _=0;_<7;_++){let T=([1,3,5].includes(_)?g[_].padEnd(3):"   ")+" "+p[_].join("");h.push(T)}return h.push(""),h.push("    Less "+[cDe("\u2591"),cDe("\u2592"),cDe("\u2593"),cDe("\u2588")].join(" ")+" More"),h.join(`
`)}
function DWp(e,t){if(e===0||!t)return 0;if(e>=t.p75)return 4;if(e>=t.p50)return 3;if(e>=t.p25)return 2;return 1}
function PWp(e){switch(e){case 0:return _t.gray("\xB7");case 1:return cDe("\u2591");case 2:return cDe("\u2592");case 3:return cDe("\u2593");case 4:return cDe("\u2588");default:return _t.gray("\xB7")}}
var cDe;
var Dal=b(()=>{cu();oTo();cDe=_t.hex("#da7756")});
export {IWp,sTo,DWp,PWp,cDe,Dal};
