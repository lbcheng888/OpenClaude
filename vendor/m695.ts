// @ts-nocheck
import {b} from "../runtime.ts";
async function Eis(e,t){let n=Buffer.from(t,"utf-8"),r=n.length,o=wTr;if(o)wTr=null;else o=Buffer.allocUnsafe(yis+1);let s,i=0,a=0,l=0,c=0,u=0,d=0,p=0,m=0,f=0,h=0,g=0,_=0,T;try{s=await Sis.open(bis.join(e,"packed-refs"),"r"),i=(await s.stat()).size,l=i;while(a<l){if(c=a+Math.floor((l-a)/2),d=Math.max(a,c-Giu),p=(await s.read(o,0,Math.min(yis,i-d),d)).bytesRead,u=c-d,u>=p)return null;if(o[p]=q1e,m=u>0?o.lastIndexOf(q1e,u-1)+1:0,m>1&&o[m]===Tis)m=o.lastIndexOf(q1e,m-2)+1;if(o[m]===Kiu){g=o.indexOf(q1e,m),a=d+(g<0||g>=p?p:g+1);continue}if(f===0)f=m+40<p&&o[m+40]===Viu?40:64;if(h=m+f+1,h>=p)return null;if(_=o.compare(n,0,r,h,Math.min(h+r,p)),_===0){if(h+r<p&&o[h+r]!==q1e){l=d+m;continue}return T=o.toString("ascii",m,m+f),ziu.test(T)?T:null}if(_<0){if(g=o.indexOf(q1e,u),g<0||g>=p)g=p-1;if(g+1<p&&o[g+1]===Tis){if(g=o.indexOf(q1e,g+1),g<0||g>=p)g=p-1}a=d+g+1}else l=d+m}return null}catch{return null}finally{wTr=o,await s?.close()}}
var Sis,bis,yis=65536,Giu=4096,q1e=10,Viu=32,Tis=94,Kiu=35,ziu,wTr=null;
var Cis=b(()=>{Sis=require("fs/promises"),bis=require("path"),ziu=/^[0-9a-f]+$/});
export {Eis,Sis,bis,yis,Giu,q1e,Viu,Tis,Kiu,ziu,wTr,Cis};
