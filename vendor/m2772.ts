// @ts-nocheck
import {Wke,tzr} from "./m2770.ts";
import {b} from "../runtime.ts";
function Aot(e,t,n,r,o,s,i){let a;if(!i)a={};else if(typeof i==="function")a={callback:i};else a=i;if(typeof a.context>"u")a.context=4;let l=a.context;if(a.newlineIsToken)throw Error("newlineIsToken may not be used with patch-generation functions, only with diffing functions");if(!a.callback)return c(Wke(n,r,a));else{let{callback:u}=a;Wke(n,r,Object.assign(Object.assign({},a),{callback:(d)=>{let p=c(d);u(p)}}))}function c(u){if(!u)return;u.push({value:"",lines:[]});function d(T){return T.map(function(y){return" "+y})}let p=[],m=0,f=0,h=[],g=1,_=1;for(let T=0;T<u.length;T++){let y=u[T],S=y.lines||aNd(y.value);if(y.lines=S,y.added||y.removed){if(!m){let E=u[T-1];if(m=g,f=_,E)h=l>0?d(E.lines.slice(-l)):[],m-=h.length,f-=h.length}for(let E of S)h.push((y.added?"+":"-")+E);if(y.added)_+=S.length;else g+=S.length}else{if(m)if(S.length<=l*2&&T<u.length-2)for(let E of d(S))h.push(E);else{let E=Math.min(S.length,l);for(let w of d(S.slice(0,E)))h.push(w);let R={oldStart:m,oldLines:g-m+E,newStart:f,newLines:_-f+E,lines:h};p.push(R),m=0,f=0,h=[]}g+=S.length,_+=S.length}}for(let T of p)for(let y=0;y<T.lines.length;y++)if(T.lines[y].endsWith(`
`))T.lines[y]=T.lines[y].slice(0,-1);else T.lines.splice(y+1,0,"\\ No newline at end of file"),y++;return{oldFileName:e,newFileName:t,oldHeader:o,newHeader:s,hunks:p}}}
function aNd(e){let t=e.endsWith(`
`),n=e.split(`
`).map((r)=>r+`
`);if(t)n.pop();else n.push(n.pop().slice(0,-1));return n}
var k5i=b(()=>{tzr()});
export {Aot,aNd,k5i};
