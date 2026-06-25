// @ts-nocheck
import {Q} from "../runtime.ts";
import {oCl} from "./m4737.ts";
var sCl=Q((BWt)=>{var Kwo=oCl();BWt.mul=function(t,n){let r=new Uint8Array(t.length+n.length-1);for(let o=0;o<t.length;o++)for(let s=0;s<n.length;s++)r[o+s]^=Kwo.mul(t[o],n[s]);return r};BWt.mod=function(t,n){let r=new Uint8Array(t);while(r.length-n.length>=0){let o=r[0];for(let i=0;i<n.length;i++)r[i]^=Kwo.mul(n[i],o);let s=0;while(s<r.length&&r[s]===0)s++;r=r.slice(s)}return r};BWt.generateECPolynomial=function(t){let n=new Uint8Array([1]);for(let r=0;r<t;r++)n=BWt.mul(n,new Uint8Array([1,Kwo.exp(r)]));return n}});
export {sCl};
