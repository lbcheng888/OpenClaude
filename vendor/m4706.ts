// @ts-nocheck
import {X} from "../runtime.ts";
import {lAl} from "./m4705.ts";
var cAl=X((Sjt)=>{var Rbo=lAl();Sjt.mul=function(t,n){let r=new Uint8Array(t.length+n.length-1);for(let o=0;o<t.length;o++)for(let s=0;s<n.length;s++)r[o+s]^=Rbo.mul(t[o],n[s]);return r};Sjt.mod=function(t,n){let r=new Uint8Array(t);while(r.length-n.length>=0){let o=r[0];for(let i=0;i<n.length;i++)r[i]^=Rbo.mul(n[i],o);let s=0;while(s<r.length&&r[s]===0)s++;r=r.slice(s)}return r};Sjt.generateECPolynomial=function(t){let n=new Uint8Array([1]);for(let r=0;r<t;r++)n=Sjt.mul(n,new Uint8Array([1,Rbo.exp(r)]));return n}});
export {cAl};
