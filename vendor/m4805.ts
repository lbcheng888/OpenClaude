// @ts-nocheck
import {uO,P8,fsModule} from "./m2277.ts";
import {Nk,tS,hg} from "./m2280.ts";
import {b} from "../runtime.ts";
function Fcm(e){let t="";for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r>=32&&r!==127&&!(r>=128&&r<=159))t+=e[n]}return t}
function Bcm(e){if(e.length===0)return null;if(Buffer.byteLength(e,"utf8")>Ncm)return null;let t=[],n=0;while(n<e.length){let r=e[n];if(r===uO){t.push({kind:"bel"}),n++;continue}if(r!==P8||e[n+1]!=="]")return null;let o=n+2,s=-1,i=0;while(o<e.length){if(e[o]===uO){s=o,i=1;break}if(e[o]===P8&&e[o+1]==="\\"){s=o,i=2;break}if(e[o]===P8)return null;o++}if(s===-1)return null;let a=e.slice(n+2,s),l=a.indexOf(";"),c=l===-1?a:a.slice(0,l),u=l===-1?"":a.slice(l+1);if(!/^\d+$/.test(c))return null;let d=Number(c);if(!Mcm.has(d))return null;t.push({kind:"osc",ps:d,payload:Fcm(u)}),n=s+i}return t}
function tHo(e){let t=Bcm(e);if(t===null)return null;return t.map((n)=>n.kind==="bel"?uO:Nk(tS(n.ps,n.payload))).join("")}
function Tvl(e){if(e===null){tGt.length=0;return}tGt.push(e)}
function Svl(e){let t=tGt.lastIndexOf(e);if(t>=0)tGt.splice(t,1)}
function nHo(e){tGt.at(-1)?.(e)}
var Mcm,Ncm=4096,tGt;
var rHo=b(()=>{fsModule();hg();Mcm=new Set([0,1,2,9,99,777]);tGt=[]});
export {Fcm,Bcm,tHo,Tvl,Svl,nHo,Mcm,Ncm,tGt,rHo};
