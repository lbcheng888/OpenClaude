// @ts-nocheck
import {Yxr,v6s,yNe} from "./m1537.ts";
import {xQ,Hwt} from "./m1514.ts";
import {lCe} from "./m1534.ts";
import {b} from "../runtime.ts";
import {Dwt} from "./m1536.ts";
var Udn,Jxr,$dn=(e,t,n)=>`${e}/${t}/${n}/${Yxr}`,x6s=async(e,t,n,r,o)=>{let s=await R6s(e,t.secretAccessKey,t.accessKeyId),i=`${n}:${r}:${o}:${xQ(s)}:${t.sessionToken}`;if(i in Udn)return Udn[i];Jxr.push(i);while(Jxr.length>v6s)delete Udn[Jxr.shift()];let a=`AWS4${t.secretAccessKey}`;for(let l of[n,r,o,Yxr])a=await R6s(e,a,l);return Udn[i]=a},R6s=(e,t,n)=>{let r=new e(t);return r.update(lCe(n)),r.digest()};
var Xxr=b(()=>{Hwt();Dwt();yNe();Udn={},Jxr=[]});
export {Udn,Jxr,$dn,x6s,R6s,Xxr};
