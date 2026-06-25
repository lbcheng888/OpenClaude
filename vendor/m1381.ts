// @ts-nocheck
import {ft,b,autofixError,x} from "../runtime.ts";
import {u2u,X3s,Q3s} from "./m1375.ts";
import {g2u,p4s,u4s,f2u,c4s,m2u,h2u,Dpn,m4s} from "./m1380.ts";
import {BIr,xpn,p2u} from "./m1378.ts";
import {NIr,e4s,FIr,t4s} from "./m1376.ts";
import {LIr,OIr,vAe,c2u,MIr} from "./m1374.ts";
import {k9s,H9s} from "./m1358.ts";
import {Rd,J3s} from "./m1373.ts";
import {Hpn,w9s} from "./m1357.ts";
import {l4s} from "./m1379.ts";
import {b3} from "./m827.ts";
var S2u=(e)=>{if(e!==e)return"NaN";switch(e){case 1/0:return"Infinity";case-1/0:return"-Infinity";default:return e}},b2u=(e)=>e.toISOString().replace(".000Z","Z");
var UIr=(e)=>{if(e==null)return{};if(Array.isArray(e))return e.filter((t)=>t!=null).map(UIr);if(typeof e==="object"){let t={};for(let n of Object.keys(e)){if(e[n]==null)continue;t[n]=UIr(e[n])}return t}return e};
var jv={};
ft(jv,{withBaseException:()=>u2u,throwDefaultError:()=>X3s,take:()=>g2u,serializeFloat:()=>S2u,serializeDateTime:()=>b2u,resolvedPath:()=>p4s.resolvedPath,resolveDefaultRuntimeConfig:()=>BIr,map:()=>u4s,loadConfigsForDefaultMode:()=>NIr,isSerializableHeaderValue:()=>f2u,getValueFromTextNode:()=>c4s,getDefaultExtensionConfiguration:()=>xpn,getDefaultClientConfiguration:()=>p2u,getArrayIfSingleItem:()=>m2u,extendedEncodeURIComponent:()=>e4s.extendedEncodeURIComponent,emitWarningIfUnsupportedVersion:()=>FIr,decorateServiceException:()=>LIr,createAggregatedClient:()=>OIr,convertMap:()=>h2u,collectBody:()=>k9s.collectBody,_json:()=>UIr,ServiceException:()=>vAe,SENSITIVE_STRING:()=>c2u,NoOpLogger:()=>Dpn,Command:()=>Rd,Client:()=>Hpn});
var vy=b(()=>{w9s();H9s();J3s();Q3s();MIr();t4s();l4s();m4s();autofixError(jv,x(b3(),1),module.exports)});
export {S2u,b2u,UIr,jv,vy};
