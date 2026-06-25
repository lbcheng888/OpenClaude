// @ts-nocheck
import {ft,b,autofixError,x} from "../runtime.ts";
import {Hmu,Efs,Cfs} from "./m839.ts";
import {Fmu,Bfs,Nfs,Mmu,Lfs,Lmu,Nmu,Mfs,Ufs} from "./m844.ts";
import {Omu,Dfs,Pmu} from "./m842.ts";
import {xmu,Rfs,Dmu,vfs} from "./m840.ts";
import {MEr,kmu,vYe,wmu,NEr} from "./m838.ts";
import {hfs,gfs} from "./m835.ts";
import {LEr,bfs} from "./m837.ts";
import {Jds,Xds} from "./m787.ts";
import {Ofs} from "./m843.ts";
import {b3} from "./m827.ts";
var qmu=(e)=>{if(e!==e)return"NaN";switch(e){case 1/0:return"Infinity";case-1/0:return"-Infinity";default:return e}},Wmu=(e)=>e.toISOString().replace(".000Z","Z");
var FEr=(e)=>{if(e==null)return{};if(Array.isArray(e))return e.filter((t)=>t!=null).map(FEr);if(typeof e==="object"){let t={};for(let n of Object.keys(e)){if(e[n]==null)continue;t[n]=FEr(e[n])}return t}return e};
var yA={};
ft(yA,{withBaseException:()=>Hmu,throwDefaultError:()=>Efs,take:()=>Fmu,serializeFloat:()=>qmu,serializeDateTime:()=>Wmu,resolvedPath:()=>Bfs.resolvedPath,resolveDefaultRuntimeConfig:()=>Omu,map:()=>Nfs,loadConfigsForDefaultMode:()=>xmu,isSerializableHeaderValue:()=>Mmu,getValueFromTextNode:()=>Lfs,getDefaultExtensionConfiguration:()=>Dfs,getDefaultClientConfiguration:()=>Pmu,getArrayIfSingleItem:()=>Lmu,extendedEncodeURIComponent:()=>Rfs.extendedEncodeURIComponent,emitWarningIfUnsupportedVersion:()=>Dmu,decorateServiceException:()=>MEr,createAggregatedClient:()=>kmu,convertMap:()=>Nmu,collectBody:()=>hfs.collectBody,_json:()=>FEr,ServiceException:()=>vYe,SENSITIVE_STRING:()=>wmu,NoOpLogger:()=>Mfs,Command:()=>LEr,Client:()=>Jds});
var $fs=b(()=>{Xds();gfs();bfs();Cfs();NEr();vfs();Ofs();Ufs();autofixError(yA,x(b3(),1),module.exports)});
export {qmu,Wmu,FEr,yA,$fs};
