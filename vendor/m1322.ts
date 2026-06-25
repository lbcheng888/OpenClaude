// @ts-nocheck
import {ft,b,autofixError,x} from "../runtime.ts";
import {QBu,l2s,c2s} from "./m1316.ts";
import {oUu,C2s,b2s,nUu,S2s,tUu,rUu,opn,A2s} from "./m1321.ts";
import {pIr,rpn,eUu} from "./m1319.ts";
import {uIr,d2s,dIr,p2s} from "./m1317.ts";
import {lIr,aIr,CAe,XBu,cIr} from "./m1315.ts";
import {BBs,UBs} from "./m1299.ts";
import {lC,a2s} from "./m1314.ts";
import {nkt,FBs} from "./m1298.ts";
import {T2s} from "./m1320.ts";
import {b3} from "./m827.ts";
var lUu=(e)=>{if(e!==e)return"NaN";switch(e){case 1/0:return"Infinity";case-1/0:return"-Infinity";default:return e}},cUu=(e)=>e.toISOString().replace(".000Z","Z");
var mIr=(e)=>{if(e==null)return{};if(Array.isArray(e))return e.filter((t)=>t!=null).map(mIr);if(typeof e==="object"){let t={};for(let n of Object.keys(e)){if(e[n]==null)continue;t[n]=mIr(e[n])}return t}return e};
var zv={};
ft(zv,{withBaseException:()=>QBu,throwDefaultError:()=>l2s,take:()=>oUu,serializeFloat:()=>lUu,serializeDateTime:()=>cUu,resolvedPath:()=>C2s.resolvedPath,resolveDefaultRuntimeConfig:()=>pIr,map:()=>b2s,loadConfigsForDefaultMode:()=>uIr,isSerializableHeaderValue:()=>nUu,getValueFromTextNode:()=>S2s,getDefaultExtensionConfiguration:()=>rpn,getDefaultClientConfiguration:()=>eUu,getArrayIfSingleItem:()=>tUu,extendedEncodeURIComponent:()=>d2s.extendedEncodeURIComponent,emitWarningIfUnsupportedVersion:()=>dIr,decorateServiceException:()=>lIr,createAggregatedClient:()=>aIr,convertMap:()=>rUu,collectBody:()=>BBs.collectBody,_json:()=>mIr,ServiceException:()=>CAe,SENSITIVE_STRING:()=>XBu,NoOpLogger:()=>opn,Command:()=>lC,Client:()=>nkt});
var rD=b(()=>{FBs();UBs();a2s();c2s();cIr();p2s();T2s();A2s();autofixError(zv,x(b3(),1),module.exports)});
export {lUu,cUu,mIr,zv,rD};
