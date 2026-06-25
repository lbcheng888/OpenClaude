// @ts-nocheck
import {lu,Cf,zf} from "./m133.ts";
import {In,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
async function xBa(e,t,n=3){let r=await J9t(e);if(r===null)return null;try{return await Duo(r,t,n)}finally{await r.close()}}
async function J9t(e){if(lu(e)&&!Cf(e))return null;try{return await IBa.open(e,"r")}catch(t){if(In(t))return null;throw t}}
async function Duo(e,t,n){if(t==="")return{content:"",lineOffset:1,truncated:!1};let r=Buffer.from(t,"utf8"),o=0;for(let d=0;d<r.length;d++)if(r[d]===D$n)o++;let s,i=r.length+o-1,a=Buffer.allocUnsafe(K0e+i),l=0,c=0,u=0;while(l<x$n){let{bytesRead:d}=await e.read(a,u,K0e,l);if(d===0)break;let p=u+d,m=HBa(a,r,p),f=r.length;if(m===-1&&o>0)s??=Buffer.from(t.replaceAll(`
`,`\r
`),"utf8"),m=HBa(a,s,p),f=s.length;if(m!==-1){let g=l-u+m;return await skp(e,a,g,f,n,c+xuo(a,0,m))}l+=d;let h=Math.min(i,p);c+=xuo(a,0,p-h),u=h,a.copyWithin(0,p-u,p)}return{content:"",lineOffset:1,truncated:l>=x$n}}
async function P$n(e){let t=Buffer.allocUnsafe(K0e),n=0;for(;;){if(n===t.length){let o=Buffer.allocUnsafe(Math.min(t.length*2,x$n+K0e));t.copy(o,0,0,n),t=o}let{bytesRead:r}=await e.read(t,n,t.length-n,n);if(r===0)break;if(n+=r,n>x$n)return null}return DBa(t,n)}
function HBa(e,t,n){let r=e.indexOf(t);return r===-1||r+t.length>n?-1:r}
function xuo(e,t,n){let r=0;for(let o=t;o<n;o++)if(e[o]===D$n)r++;return r}
function DBa(e,t){let n=e.toString("utf8",0,t);return n.includes("\r")?n.replaceAll(`\r
`,`
`):n}
async function skp(e,t,n,r,o,s){let i=Math.min(n,K0e),{bytesRead:a}=await e.read(t,0,i,n-i),l=n,c=0;for(let T=a-1;T>=0&&c<=o;T--){if(t[T]===D$n){if(c++,c>o)break}l--}let u=n-l,d=s-xuo(t,a-u,a)+1,p=n+r,{bytesRead:m}=await e.read(t,0,K0e,p),f=p;c=0;for(let T=0;T<m;T++)if(f++,t[T]===D$n){if(c++,c>=o+1)break}let h=f-l,g=h<=t.length?t:Buffer.allocUnsafe(h),{bytesRead:_}=await e.read(g,0,h,l);return{content:DBa(g,_),lineOffset:d,truncated:!1}}
var IBa,K0e=8192,x$n=10485760,D$n=10;
var O$n=b(()=>{zf();Ct();IBa=require("fs/promises")});
export {xBa,J9t,Duo,P$n,HBa,xuo,DBa,skp,IBa,K0e,x$n,D$n,O$n};
