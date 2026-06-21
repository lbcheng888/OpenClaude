// @ts-nocheck
import {isFullscreenWithTTY,b,Yo,M} from "../runtime.ts";
import {fpu,Xhs,Qhs} from "./m943.ts";
import {Tpu,pgs,ugs,_pu,cgs,gpu,ypu,esn,mgs} from "./m948.ts";
import {ITr,Zon,hpu} from "./m946.ts";
import {kTr,egs,HTr,tgs} from "./m944.ts";
import {RTr,wTr,cEe,mpu,xTr} from "./m942.ts";
import {xAs,kAs} from "./m926.ts";
import {pQ,Jhs} from "./m941.ts";
import {Xon,RAs} from "./m925.ts";
import {lgs} from "./m947.ts";
import {n4} from "./m822.ts";
var Cpu=(e)=>{if(e!==e)return"NaN";switch(e){case 1/0:return"Infinity";case-1/0:return"-Infinity";default:return e}},vpu=(e)=>e.toISOString().replace(".000Z","Z");
var DTr=(e)=>{if(e==null)return{};if(Array.isArray(e))return e.filter((t)=>t!=null).map(DTr);if(typeof e==="object"){let t={};for(let n of Object.keys(e)){if(e[n]==null)continue;t[n]=DTr(e[n])}return t}return e};
var HR={};
isFullscreenWithTTY(HR,{withBaseException:()=>fpu,throwDefaultError:()=>Xhs,take:()=>Tpu,serializeFloat:()=>Cpu,serializeDateTime:()=>vpu,resolvedPath:()=>pgs.resolvedPath,resolveDefaultRuntimeConfig:()=>ITr,map:()=>ugs,loadConfigsForDefaultMode:()=>kTr,isSerializableHeaderValue:()=>_pu,getValueFromTextNode:()=>cgs,getDefaultExtensionConfiguration:()=>Zon,getDefaultClientConfiguration:()=>hpu,getArrayIfSingleItem:()=>gpu,extendedEncodeURIComponent:()=>egs.extendedEncodeURIComponent,emitWarningIfUnsupportedVersion:()=>HTr,decorateServiceException:()=>RTr,createAggregatedClient:()=>wTr,convertMap:()=>ypu,collectBody:()=>xAs.collectBody,_json:()=>DTr,ServiceException:()=>cEe,SENSITIVE_STRING:()=>mpu,NoOpLogger:()=>esn,Command:()=>pQ,Client:()=>Xon});
var H7=b(()=>{RAs();kAs();Jhs();Qhs();xTr();tgs();lgs();mgs();Yo(HR,M(n4(),1),module.exports)});
export {Cpu,vpu,DTr,HR,H7};
