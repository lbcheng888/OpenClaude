// @ts-nocheck
import {whe,JRn,dwe,I2e} from "./m2532.ts";
import {$T,p0} from "./m236.ts";
import {b} from "../runtime.ts";
function K8e(e,t,n){let r=t;for(let o=0;o<n;o++){let s=aXp(e,r);if(s.equals(r))break;r=s}return r}
function aXp(e,t){switch(e){case"h":return t.left();case"l":case" ":return t.right();case"j":return t.downLogicalLine();case"k":return t.upLogicalLine();case"gj":return t.down();case"gk":return t.up();case"w":return t.nextVimWord();case"b":return t.prevVimWord();case"e":return t.endOfVimWord();case"W":return t.nextWORD();case"B":return t.prevWORD();case"E":return t.endOfWORD();case"0":return t.startOfLogicalLine();case"^":return t.firstNonBlankInLogicalLine();case"$":return t.lastCharInLogicalLine();case"G":return t.startOfLastLine();default:return t}}
function UAo(e){return"eE$".includes(e)}
function Gml(e){return"jkG".includes(e)||e==="gg"}
function GVn(e,t,n,r){if(n==="w")return Vml(e,t,r,whe);if(n==="W")return Vml(e,t,r,(s)=>!JRn(s));let o=lXp[n];if(o){let[s,i]=o;return s===i?cXp(e,t,s,r):uXp(e,t,s,i,r)}return null}
function Vml(e,t,n,r){let o=[];for(let{segment:m,index:f}of $T().segment(e))o.push({segment:m,index:f});if(o.length===0)return null;let s=o.length-1;for(let m=0;m<o.length;m++){let f=o[m],h=m+1<o.length?o[m+1].index:e.length;if(t>=f.index&&t<h){s=m;break}}let i=(m)=>o[m]?.segment??"",a=(m)=>m<o.length?o[m].index:e.length,l=(m)=>JRn(i(m)),c=(m)=>r(i(m)),u=(m)=>dwe(i(m)),d=s,p=s;if(c(s)){while(d>0&&c(d-1))d--;while(p<o.length&&c(p))p++}else if(l(s)){while(d>0&&l(d-1))d--;while(p<o.length&&l(p))p++;return{start:a(d),end:a(p)}}else if(u(s)){while(d>0&&u(d-1))d--;while(p<o.length&&u(p))p++}if(!n){if(p<o.length&&l(p))while(p<o.length&&l(p))p++;else if(d>0&&l(d-1))while(d>0&&l(d-1))d--}return{start:a(d),end:a(p)}}
function cXp(e,t,n,r){let o=e.lastIndexOf(`
`,t-1)+1,s=e.indexOf(`
`,t),i=s===-1?e.length:s,a=e.slice(o,i),l=t-o,c=[];for(let u=0;u<a.length;u++)if(a[u]===n)c.push(u);for(let u=0;u<c.length-1;u+=2){let d=c[u],p=c[u+1];if(d<=l&&l<=p)return r?{start:o+d+1,end:o+p}:{start:o+d,end:o+p+1}}return null}
function uXp(e,t,n,r,o){let s=0,i=-1;for(let l=t;l>=0;l--)if(e[l]===r&&l!==t)s++;else if(e[l]===n){if(s===0){i=l;break}s--}if(i===-1)return null;s=0;let a=-1;for(let l=i+1;l<e.length;l++)if(e[l]===n)s++;else if(e[l]===r){if(s===0){a=l;break}s--}if(a===-1)return null;return o?{start:i+1,end:a}:{start:i,end:a+1}}
var lXp;
var $Ao=b(()=>{I2e();p0();lXp={"(":["(",")"],")":["(",")"],b:["(",")"],"[":["[","]"],"]":["[","]"],"{":["{","}"],"}":["{","}"],B:["{","}"],"<":["<",">"],">":["<",">"],'"':['"','"'],"'":["'","'"],"`":["`","`"]}});
export {K8e,aXp,UAo,Gml,GVn,Vml,cXp,uXp,lXp,$Ao};
