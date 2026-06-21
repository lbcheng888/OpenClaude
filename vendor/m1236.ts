// @ts-nocheck
import {isFullscreenWithTTY,b,Yo,M} from "../runtime.ts";
import {_Ru,D0s,P0s} from "./m1230.ts";
import {CRu,K0s,G0s,bRu,W0s,SRu,ERu,_ln,z0s} from "./m1235.ts";
import {bCr,gln,TRu} from "./m1233.ts";
import {TCr,L0s,SCr,M0s} from "./m1231.ts";
import {_Cr,gCr,DEe,gRu,yCr} from "./m1229.ts";
import {cIs,uIs} from "./m1213.ts";
import {Ew,I0s} from "./m1228.ts";
import {cvt,lIs} from "./m1212.ts";
import {j0s} from "./m1234.ts";
import {n4} from "./m822.ts";
var xRu=(e)=>{if(e!==e)return"NaN";switch(e){case 1/0:return"Infinity";case-1/0:return"-Infinity";default:return e}},kRu=(e)=>e.toISOString().replace(".000Z","Z");
var ECr=(e)=>{if(e==null)return{};if(Array.isArray(e))return e.filter((t)=>t!=null).map(ECr);if(typeof e==="object"){let t={};for(let n of Object.keys(e)){if(e[n]==null)continue;t[n]=ECr(e[n])}return t}return e};
var DR={};
isFullscreenWithTTY(DR,{withBaseException:()=>_Ru,throwDefaultError:()=>D0s,take:()=>CRu,serializeFloat:()=>xRu,serializeDateTime:()=>kRu,resolvedPath:()=>K0s.resolvedPath,resolveDefaultRuntimeConfig:()=>bCr,map:()=>G0s,loadConfigsForDefaultMode:()=>TCr,isSerializableHeaderValue:()=>bRu,getValueFromTextNode:()=>W0s,getDefaultExtensionConfiguration:()=>gln,getDefaultClientConfiguration:()=>TRu,getArrayIfSingleItem:()=>SRu,extendedEncodeURIComponent:()=>L0s.extendedEncodeURIComponent,emitWarningIfUnsupportedVersion:()=>SCr,decorateServiceException:()=>_Cr,createAggregatedClient:()=>gCr,convertMap:()=>ERu,collectBody:()=>cIs.collectBody,_json:()=>ECr,ServiceException:()=>DEe,SENSITIVE_STRING:()=>gRu,NoOpLogger:()=>_ln,Command:()=>Ew,Client:()=>cvt});
var PO=b(()=>{lIs();uIs();I0s();P0s();yCr();M0s();j0s();z0s();Yo(DR,M(n4(),1),module.exports)});
export {xRu,kRu,ECr,DR,PO};
