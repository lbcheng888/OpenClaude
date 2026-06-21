// @ts-nocheck
import {wwe,EF,K4} from "../src/session/2521_id.ts";
import {b} from "../runtime.ts";
function F0m(e,t,n=!1){if(!n&&e.length<=Gjl||e.length<=YAt)return{truncatedText:e,placeholderContent:""};let r=Math.floor(YAt/2),o=Math.floor(YAt/2),s=e.slice(0,r),i=e.slice(-o),a=e.slice(r,-o),l=wwe(a),u=U0m(t,l);return{truncatedText:s+u+i,placeholderContent:a}}
function U0m(e,t){return`[...Truncated text #${e} +${t} lines...]`}
function Vjl(e,t){if(e.length<=Gjl)return{newInput:e,newPastedContents:t};let n=Object.keys(t).map(Number),r=n.length>0?Math.max(...n)+1:1,o=Math.floor(YAt/2),s=e.length-Math.floor(YAt/2),i=new Set,a=new Set,l=[],c=e,u=EF(e);for(let A=u.length-1;A>=0;A--){let h=u[A],g=t[h.id];if(!g)continue;let _=h.index+h.match.length,y=_>o&&h.index<s;if(g.type!=="text"){if(y)l.unshift(h.match),c=c.slice(0,h.index)+c.slice(_);continue}if(!y){a.add(h.id);continue}c=c.slice(0,h.index)+g.content+c.slice(_),i.add(h.id)}let{truncatedText:d,placeholderContent:p}=F0m(c,r,!0);if(!p)return{newInput:e,newPastedContents:t};let m=d;if(l.length>0){let A=Math.floor(YAt/2);m=d.slice(0,A)+l.join("")+d.slice(A)}let f={};for(let[A,h]of Object.entries(t)){let g=Number(A);if(i.has(g)&&!a.has(g))continue;f[g]=h}return f[r]={id:r,type:"text",content:p},{newInput:m,newPastedContents:f}}
var Gjl=1e4,YAt=1000;
var Kjl=b(()=>{K4()});
export {F0m,U0m,Vjl,Gjl,YAt,Kjl};
