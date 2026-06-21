// @ts-nocheck
import {isFullscreenWithTTY,b,Yo,M} from "../runtime.ts";
import {Hhu,DEs,PEs} from "./m1040.ts";
import {Mhu,KEs,GEs,Ohu,WEs,Phu,Lhu,tin,zEs} from "./m1045.ts";
import {XSr,ein,Dhu} from "./m1043.ts";
import {YSr,LEs,JSr,MEs} from "./m1041.ts";
import {KSr,VSr,EEe,khu,zSr} from "./m1039.ts";
import {cbs,ubs} from "./m1023.ts";
import {$Command,IEs} from "./m1038.ts";
import {__Client,lbs} from "./m1022.ts";
import {jEs} from "./m1044.ts";
import {n4} from "./m822.ts";
var Uhu=(e)=>{if(e!==e)return"NaN";switch(e){case 1/0:return"Infinity";case-1/0:return"-Infinity";default:return e}},$hu=(e)=>e.toISOString().replace(".000Z","Z");
var QSr=(e)=>{if(e==null)return{};if(Array.isArray(e))return e.filter((t)=>t!=null).map(QSr);if(typeof e==="object"){let t={};for(let n of Object.keys(e)){if(e[n]==null)continue;t[n]=QSr(e[n])}return t}return e};
var IR={};
isFullscreenWithTTY(IR,{withBaseException:()=>Hhu,throwDefaultError:()=>DEs,take:()=>Mhu,serializeFloat:()=>Uhu,serializeDateTime:()=>$hu,resolvedPath:()=>KEs.resolvedPath,resolveDefaultRuntimeConfig:()=>XSr,map:()=>GEs,loadConfigsForDefaultMode:()=>YSr,isSerializableHeaderValue:()=>Ohu,getValueFromTextNode:()=>WEs,getDefaultExtensionConfiguration:()=>ein,getDefaultClientConfiguration:()=>Dhu,getArrayIfSingleItem:()=>Phu,extendedEncodeURIComponent:()=>LEs.extendedEncodeURIComponent,emitWarningIfUnsupportedVersion:()=>JSr,decorateServiceException:()=>KSr,createAggregatedClient:()=>VSr,convertMap:()=>Lhu,collectBody:()=>cbs.collectBody,_json:()=>QSr,ServiceException:()=>EEe,SENSITIVE_STRING:()=>khu,NoOpLogger:()=>tin,Command:()=>$Command,Client:()=>__Client});
var ri=b(()=>{lbs();ubs();IEs();PEs();zSr();MEs();jEs();zEs();Yo(IR,M(n4(),1),module.exports)});
export {Uhu,$hu,QSr,IR,ri};
