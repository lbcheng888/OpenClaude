// @ts-nocheck
import {RDr,SKs,hFe} from "./m1542.ts";
import {AQ,rHt} from "./m1519.ts";
import {VAe} from "./m1539.ts";
import {b} from "../runtime.ts";
import {sHt} from "./m1541.ts";
var Efn,vDr,Cfn=(e,t,n)=>`${e}/${t}/${n}/${RDr}`,CKs=async(e,t,n,r,o)=>{let s=await EKs(e,t.secretAccessKey,t.accessKeyId),i=`${n}:${r}:${o}:${AQ(s)}:${t.sessionToken}`;if(i in Efn)return Efn[i];vDr.push(i);while(vDr.length>SKs)delete Efn[vDr.shift()];let a=`AWS4${t.secretAccessKey}`;for(let l of[n,r,o,RDr])a=await EKs(e,a,l);return Efn[i]=a},EKs=(e,t,n)=>{let r=new e(t);return r.update(VAe(n)),r.digest()};
var wDr=b(()=>{rHt();sHt();hFe();Efn={},vDr=[]});
export {Efn,vDr,Cfn,CKs,EKs,wDr};
