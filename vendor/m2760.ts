// @ts-nocheck
import {rxe,b5r} from "./m2758.ts";
import {b} from "../runtime.ts";
function ynt(e,t,n,r,o,s,i){let a;if(!i)a={};else if(typeof i==="function")a={callback:i};else a=i;if(typeof a.context>"u")a.context=4;let l=a.context;if(a.newlineIsToken)throw Error("newlineIsToken may not be used with patch-generation functions, only with diffing functions");if(!a.callback)return c(rxe(n,r,a));else{let{callback:u}=a;rxe(n,r,Object.assign(Object.assign({},a),{callback:(d)=>{let p=c(d);u(p)}}))}function c(u){if(!u)return;u.push({value:"",lines:[]});function d(_){return _.map(function(y){return" "+y})}let p=[],m=0,f=0,A=[],h=1,g=1;for(let _=0;_<u.length;_++){let y=u[_],T=y.lines||Sxd(y.value);if(y.lines=T,y.added||y.removed){if(!m){let S=u[_-1];if(m=h,f=g,S)A=l>0?d(S.lines.slice(-l)):[],m-=A.length,f-=A.length}for(let S of T)A.push((y.added?"+":"-")+S);if(y.added)g+=T.length;else h+=T.length}else{if(m)if(T.length<=l*2&&_<u.length-2)for(let S of d(T))A.push(S);else{let S=Math.min(T.length,l);for(let R of d(T.slice(0,S)))A.push(R);let v={oldStart:m,oldLines:h-m+S,newStart:f,newLines:g-f+S,lines:A};p.push(v),m=0,f=0,A=[]}h+=T.length,g+=T.length}}for(let _ of p)for(let y=0;y<_.lines.length;y++)if(_.lines[y].endsWith(`
`))_.lines[y]=_.lines[y].slice(0,-1);else _.lines.splice(y+1,0,"\\ No newline at end of file"),y++;return{oldFileName:e,newFileName:t,oldHeader:o,newHeader:s,hunks:p}}}
function Sxd(e){let t=e.endsWith(`
`),n=e.split(`
`).map((r)=>r+`
`);if(t)n.pop();else n.push(n.pop().slice(0,-1));return n}
var N2i=b(()=>{b5r()});
export {ynt,Sxd,N2i};
