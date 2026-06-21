// @ts-nocheck
import {yd,YA,ng} from "./m132.ts";
import {Pn,bt} from "./m195.ts";
import {b} from "../runtime.ts";
async function EUa(e,t,n=3){let r=await M$t(e);if(r===null)return null;try{return await Clo(r,t,n)}finally{await r.close()}}
async function M$t(e){if(yd(e)&&!YA(e))return null;try{return await bUa.open(e,"r")}catch(t){if(Pn(t))return null;throw t}}
async function Clo(e,t,n){if(t==="")return{content:"",lineOffset:1,truncated:!1};let r=Buffer.from(t,"utf8"),o=0;for(let d=0;d<r.length;d++)if(r[d]===$2n)o++;let s,i=r.length+o-1,a=Buffer.allocUnsafe(RIe+i),l=0,c=0,u=0;while(l<U2n){let{bytesRead:d}=await e.read(a,u,RIe,l);if(d===0)break;let p=u+d,m=SUa(a,r,p),f=r.length;if(m===-1&&o>0)s??=Buffer.from(t.replaceAll(`
`,`\r
`),"utf8"),m=SUa(a,s,p),f=s.length;if(m!==-1){let h=l-u+m;return await Kvp(e,a,h,f,n,c+Elo(a,0,m))}l+=d;let A=Math.min(i,p);c+=Elo(a,0,p-A),u=A,a.copyWithin(0,p-u,p)}return{content:"",lineOffset:1,truncated:l>=U2n}}
async function q2n(e){let t=Buffer.allocUnsafe(RIe),n=0;for(;;){if(n===t.length){let o=Buffer.allocUnsafe(Math.min(t.length*2,U2n+RIe));t.copy(o,0,0,n),t=o}let{bytesRead:r}=await e.read(t,n,t.length-n,n);if(r===0)break;if(n+=r,n>U2n)return null}return CUa(t,n)}
function SUa(e,t,n){let r=e.indexOf(t);return r===-1||r+t.length>n?-1:r}
function Elo(e,t,n){let r=0;for(let o=t;o<n;o++)if(e[o]===$2n)r++;return r}
function CUa(e,t){let n=e.toString("utf8",0,t);return n.includes("\r")?n.replaceAll(`\r
`,`
`):n}
async function Kvp(e,t,n,r,o,s){let i=Math.min(n,RIe),{bytesRead:a}=await e.read(t,0,i,n-i),l=n,c=0;for(let _=a-1;_>=0&&c<=o;_--){if(t[_]===$2n){if(c++,c>o)break}l--}let u=n-l,d=s-Elo(t,a-u,a)+1,p=n+r,{bytesRead:m}=await e.read(t,0,RIe,p),f=p;c=0;for(let _=0;_<m;_++)if(f++,t[_]===$2n){if(c++,c>=o+1)break}let A=f-l,h=A<=t.length?t:Buffer.allocUnsafe(A),{bytesRead:g}=await e.read(h,0,A,l);return{content:CUa(h,g),lineOffset:d,truncated:!1}}
var bUa,RIe=8192,U2n=10485760,$2n=10;
var j2n=b(()=>{ng();bt();bUa=require("fs/promises")});
export {EUa,M$t,Clo,q2n,SUa,Elo,CUa,Kvp,bUa,RIe,U2n,$2n,j2n};
