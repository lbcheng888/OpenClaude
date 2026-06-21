// @ts-nocheck
import {isFullscreenWithTTY,b,Yo,M} from "../runtime.ts";
import {LIu,mMs,fMs} from "./m1311.ts";
import {$Iu,xMs,wMs,FIu,vMs,BIu,UIu,Tcn,kMs} from "./m1316.ts";
import {Nvr,ycn,NIu} from "./m1314.ts";
import {Lvr,hMs,Mvr,gMs} from "./m1312.ts";
import {Pvr,Dvr,UEe,OIu,Ovr} from "./m1310.ts";
import {WOs,GOs} from "./m1294.ts";
import {oC,pMs} from "./m1309.ts";
import {Hvt,jOs} from "./m1293.ts";
import {CMs} from "./m1315.ts";
import {n4} from "./m822.ts";
var GIu=(e)=>{if(e!==e)return"NaN";switch(e){case 1/0:return"Infinity";case-1/0:return"-Infinity";default:return e}},VIu=(e)=>e.toISOString().replace(".000Z","Z");
var Bvr=(e)=>{if(e==null)return{};if(Array.isArray(e))return e.filter((t)=>t!=null).map(Bvr);if(typeof e==="object"){let t={};for(let n of Object.keys(e)){if(e[n]==null)continue;t[n]=Bvr(e[n])}return t}return e};
var MR={};
isFullscreenWithTTY(MR,{withBaseException:()=>LIu,throwDefaultError:()=>mMs,take:()=>$Iu,serializeFloat:()=>GIu,serializeDateTime:()=>VIu,resolvedPath:()=>xMs.resolvedPath,resolveDefaultRuntimeConfig:()=>Nvr,map:()=>wMs,loadConfigsForDefaultMode:()=>Lvr,isSerializableHeaderValue:()=>FIu,getValueFromTextNode:()=>vMs,getDefaultExtensionConfiguration:()=>ycn,getDefaultClientConfiguration:()=>NIu,getArrayIfSingleItem:()=>BIu,extendedEncodeURIComponent:()=>hMs.extendedEncodeURIComponent,emitWarningIfUnsupportedVersion:()=>Mvr,decorateServiceException:()=>Pvr,createAggregatedClient:()=>Dvr,convertMap:()=>UIu,collectBody:()=>WOs.collectBody,_json:()=>Bvr,ServiceException:()=>UEe,SENSITIVE_STRING:()=>OIu,NoOpLogger:()=>Tcn,Command:()=>oC,Client:()=>Hvt});
var GD=b(()=>{jOs();GOs();pMs();fMs();Ovr();gMs();CMs();kMs();Yo(MR,M(n4(),1),module.exports)});
export {GIu,VIu,Bvr,MR,GD};
