// @ts-nocheck
import {b} from "../runtime.ts";
async function wes(e,t){let n=Buffer.from(t,"utf-8"),r=n.length,o=Qfr;if(o)Qfr=null;else o=Buffer.allocUnsafe(bes+1);let s,i=0,a=0,l=0,c=0,u=0,d=0,p=0,m=0,f=0,A=0,h=0,g=0,_;try{s=await Ces.open(ves.join(e,"packed-refs"),"r"),i=(await s.stat()).size,l=i;while(a<l){if(c=a+Math.floor((l-a)/2),d=Math.max(a,c-xJc),p=(await s.read(o,0,Math.min(bes,i-d),d)).bytesRead,u=c-d,u>=p)return null;if(o[p]=YMe,m=u>0?o.lastIndexOf(YMe,u-1)+1:0,m>1&&o[m]===Ees)m=o.lastIndexOf(YMe,m-2)+1;if(o[m]===HJc){h=o.indexOf(YMe,m),a=d+(h<0||h>=p?p:h+1);continue}if(f===0)f=m+40<p&&o[m+40]===kJc?40:64;if(A=m+f+1,A>=p)return null;if(g=o.compare(n,0,r,A,Math.min(A+r,p)),g===0){if(A+r<p&&o[A+r]!==YMe){l=d+m;continue}return _=o.toString("ascii",m,m+f),IJc.test(_)?_:null}if(g<0){if(h=o.indexOf(YMe,u),h<0||h>=p)h=p-1;if(h+1<p&&o[h+1]===Ees){if(h=o.indexOf(YMe,h+1),h<0||h>=p)h=p-1}a=d+h+1}else l=d+m}return null}catch{return null}finally{Qfr=o,await s?.close()}}
var Ces,ves,bes=65536,xJc=4096,YMe=10,kJc=32,Ees=94,HJc=35,IJc,Qfr=null;
var Res=b(()=>{Ces=require("fs/promises"),ves=require("path"),IJc=/^[0-9a-f]+$/});
export {wes,Ces,ves,bes,xJc,YMe,kJc,Ees,HJc,IJc,Qfr,Res};
