// @ts-nocheck
import {Q} from "../runtime.ts";
import {uYr} from "./m3050.ts";
var wQi=Q((OXg,vQi)=>{var E0n=uYr();function Wqd(){let e={},t=Object.keys(E0n);for(let n=t.length,r=0;r<n;r++)e[t[r]]={distance:-1,parent:null};return e}function Gqd(e){let t=Wqd(),n=[e];t[e].distance=0;while(n.length){let r=n.pop(),o=Object.keys(E0n[r]);for(let s=o.length,i=0;i<s;i++){let a=o[i],l=t[a];if(l.distance===-1)l.distance=t[r].distance+1,l.parent=r,n.unshift(a)}}return t}function Vqd(e,t){return function(n){return t(e(n))}}function Kqd(e,t){let n=[t[e].parent,e],r=E0n[t[e].parent][e],o=t[e].parent;while(t[o].parent)n.unshift(t[o].parent),r=Vqd(E0n[t[o].parent][o],r),o=t[o].parent;return r.conversion=n,r}vQi.exports=function(e){let t=Gqd(e),n={},r=Object.keys(t);for(let o=r.length,s=0;s<o;s++){let i=r[s];if(t[i].parent===null)continue;n[i]=Kqd(i,t)}return n}});
export {wQi};
