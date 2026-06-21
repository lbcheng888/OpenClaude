// @ts-nocheck
import {isFullscreenWithTTY,b,Yo,M} from "../runtime.ts";
import {K0u,nFs,rFs} from "./m1370.ts";
import {Z0u,gFs,AFs,X0u,fFs,J0u,Q0u,zcn,_Fs} from "./m1375.ts";
import {uwr,Kcn,Y0u} from "./m1373.ts";
import {lwr,sFs,cwr,iFs} from "./m1371.ts";
import {iwr,swr,jEe,V0u,awr} from "./m1369.ts";
import {PNs,ONs} from "./m1353.ts";
import {Jd,tFs} from "./m1368.ts";
import {Gcn,DNs} from "./m1352.ts";
import {mFs} from "./m1374.ts";
import {n4} from "./m822.ts";
var rDu=(e)=>{if(e!==e)return"NaN";switch(e){case 1/0:return"Infinity";case-1/0:return"-Infinity";default:return e}},oDu=(e)=>e.toISOString().replace(".000Z","Z");
var dwr=(e)=>{if(e==null)return{};if(Array.isArray(e))return e.filter((t)=>t!=null).map(dwr);if(typeof e==="object"){let t={};for(let n of Object.keys(e)){if(e[n]==null)continue;t[n]=dwr(e[n])}return t}return e};
var NR={};
isFullscreenWithTTY(NR,{withBaseException:()=>K0u,throwDefaultError:()=>nFs,take:()=>Z0u,serializeFloat:()=>rDu,serializeDateTime:()=>oDu,resolvedPath:()=>gFs.resolvedPath,resolveDefaultRuntimeConfig:()=>uwr,map:()=>AFs,loadConfigsForDefaultMode:()=>lwr,isSerializableHeaderValue:()=>X0u,getValueFromTextNode:()=>fFs,getDefaultExtensionConfiguration:()=>Kcn,getDefaultClientConfiguration:()=>Y0u,getArrayIfSingleItem:()=>J0u,extendedEncodeURIComponent:()=>sFs.extendedEncodeURIComponent,emitWarningIfUnsupportedVersion:()=>cwr,decorateServiceException:()=>iwr,createAggregatedClient:()=>swr,convertMap:()=>Q0u,collectBody:()=>PNs.collectBody,_json:()=>dwr,ServiceException:()=>jEe,SENSITIVE_STRING:()=>V0u,NoOpLogger:()=>zcn,Command:()=>Jd,Client:()=>Gcn});
var Ry=b(()=>{DNs();ONs();tFs();rFs();awr();iFs();mFs();_Fs();Yo(NR,M(n4(),1),module.exports)});
export {rDu,oDu,dwr,NR,Ry};
