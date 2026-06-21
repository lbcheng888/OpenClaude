// @ts-nocheck
import {X} from "../runtime.ts";
import {kGr} from "./m3040.ts";
var OVi=X((Gqh,PVi)=>{var Pxn=kGr();function l1d(){let e={},t=Object.keys(Pxn);for(let n=t.length,r=0;r<n;r++)e[t[r]]={distance:-1,parent:null};return e}function c1d(e){let t=l1d(),n=[e];t[e].distance=0;while(n.length){let r=n.pop(),o=Object.keys(Pxn[r]);for(let s=o.length,i=0;i<s;i++){let a=o[i],l=t[a];if(l.distance===-1)l.distance=t[r].distance+1,l.parent=r,n.unshift(a)}}return t}function u1d(e,t){return function(n){return t(e(n))}}function d1d(e,t){let n=[t[e].parent,e],r=Pxn[t[e].parent][e],o=t[e].parent;while(t[o].parent)n.unshift(t[o].parent),r=u1d(Pxn[t[o].parent][o],r),o=t[o].parent;return r.conversion=n,r}PVi.exports=function(e){let t=c1d(e),n={},r=Object.keys(t);for(let o=r.length,s=0;s<o;s++){let i=r[s];if(t[i].parent===null)continue;n[i]=d1d(i,t)}return n}});
export {OVi};
