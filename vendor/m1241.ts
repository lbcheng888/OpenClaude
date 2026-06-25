// @ts-nocheck
import {ft,b,autofixError,x} from "../runtime.ts";
import {OMu,v1s,w1s} from "./m1235.ts";
import {UMu,$1s,B1s,FMu,F1s,NMu,BMu,ndn,q1s} from "./m1240.ts";
import {Xkr,tdn,MMu} from "./m1238.ts";
import {Ykr,H1s,Jkr,I1s} from "./m1236.ts";
import {zkr,Kkr,fAe,PMu,jkr} from "./m1234.ts";
import {rMs,oMs} from "./m1218.ts";
import {HR,R1s} from "./m1233.ts";
import {Mwt,nMs} from "./m1217.ts";
import {N1s} from "./m1239.ts";
import {b3} from "./m827.ts";
var GMu=(e)=>{if(e!==e)return"NaN";switch(e){case 1/0:return"Infinity";case-1/0:return"-Infinity";default:return e}},VMu=(e)=>e.toISOString().replace(".000Z","Z");
var Qkr=(e)=>{if(e==null)return{};if(Array.isArray(e))return e.filter((t)=>t!=null).map(Qkr);if(typeof e==="object"){let t={};for(let n of Object.keys(e)){if(e[n]==null)continue;t[n]=Qkr(e[n])}return t}return e};
var Wv={};
ft(Wv,{withBaseException:()=>OMu,throwDefaultError:()=>v1s,take:()=>UMu,serializeFloat:()=>GMu,serializeDateTime:()=>VMu,resolvedPath:()=>$1s.resolvedPath,resolveDefaultRuntimeConfig:()=>Xkr,map:()=>B1s,loadConfigsForDefaultMode:()=>Ykr,isSerializableHeaderValue:()=>FMu,getValueFromTextNode:()=>F1s,getDefaultExtensionConfiguration:()=>tdn,getDefaultClientConfiguration:()=>MMu,getArrayIfSingleItem:()=>NMu,extendedEncodeURIComponent:()=>H1s.extendedEncodeURIComponent,emitWarningIfUnsupportedVersion:()=>Jkr,decorateServiceException:()=>zkr,createAggregatedClient:()=>Kkr,convertMap:()=>BMu,collectBody:()=>rMs.collectBody,_json:()=>Qkr,ServiceException:()=>fAe,SENSITIVE_STRING:()=>PMu,NoOpLogger:()=>ndn,Command:()=>HR,Client:()=>Mwt});
var QP=b(()=>{nMs();oMs();R1s();w1s();jkr();I1s();N1s();q1s();autofixError(Wv,x(b3(),1),module.exports)});
export {GMu,VMu,Qkr,Wv,QP};
