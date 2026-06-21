// @ts-nocheck
import {KO,y5,hZ} from "./m2267.ts";
import {Sk,aS,lg} from "./m2269.ts";
import {b} from "../runtime.ts";
function vem(e){let t="";for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r>=32&&r!==127&&!(r>=128&&r<=159))t+=e[n]}return t}
function wem(e){if(e.length===0)return null;if(Buffer.byteLength(e,"utf8")>Cem)return null;let t=[],n=0;while(n<e.length){let r=e[n];if(r===KO){t.push({kind:"bel"}),n++;continue}if(r!==y5||e[n+1]!=="]")return null;let o=n+2,s=-1,i=0;while(o<e.length){if(e[o]===KO){s=o,i=1;break}if(e[o]===y5&&e[o+1]==="\\"){s=o,i=2;break}if(e[o]===y5)return null;o++}if(s===-1)return null;let a=e.slice(n+2,s),l=a.indexOf(";"),c=l===-1?a:a.slice(0,l),u=l===-1?"":a.slice(l+1);if(!/^\d+$/.test(c))return null;let d=Number(c);if(!Eem.has(d))return null;t.push({kind:"osc",ps:d,payload:vem(u)}),n=s+i}return t}
function NEo(e){let t=wem(e);if(t===null)return null;return t.map((n)=>n.kind==="bel"?KO:Sk(aS(n.ps,n.payload))).join("")}
function b_l(e){if(e===null){Njt.length=0;return}Njt.push(e)}
function E_l(e){let t=Njt.lastIndexOf(e);if(t>=0)Njt.splice(t,1)}
function BEo(e){Njt.at(-1)?.(e)}
var Eem,Cem=4096,Njt;
var FEo=b(()=>{hZ();lg();Eem=new Set([0,1,2,9,99,777]);Njt=[]});
export {vem,wem,NEo,b_l,E_l,BEo,Eem,Cem,Njt,FEo};
