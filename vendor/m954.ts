// @ts-nocheck
import {ft,b,autofixError,x} from "../runtime.ts";
import {IEu,VEs,KEs} from "./m948.ts";
import {MEu,iCs,oCs,OEu,rCs,PEu,LEu,Nan,aCs} from "./m953.ts";
import {iRr,Man,DEu} from "./m951.ts";
import {oRr,jEs,sRr,YEs} from "./m949.ts";
import {nRr,tRr,VCe,HEu,rRr} from "./m947.ts";
import {Ebs,Cbs} from "./m931.ts";
import {cQ,GEs} from "./m946.ts";
import {Oan,bbs} from "./m930.ts";
import {nCs} from "./m952.ts";
import {b3} from "./m827.ts";
var UEu=(e)=>{if(e!==e)return"NaN";switch(e){case 1/0:return"Infinity";case-1/0:return"-Infinity";default:return e}},$Eu=(e)=>e.toISOString().replace(".000Z","Z");
var aRr=(e)=>{if(e==null)return{};if(Array.isArray(e))return e.filter((t)=>t!=null).map(aRr);if(typeof e==="object"){let t={};for(let n of Object.keys(e)){if(e[n]==null)continue;t[n]=aRr(e[n])}return t}return e};
var $v={};
ft($v,{withBaseException:()=>IEu,throwDefaultError:()=>VEs,take:()=>MEu,serializeFloat:()=>UEu,serializeDateTime:()=>$Eu,resolvedPath:()=>iCs.resolvedPath,resolveDefaultRuntimeConfig:()=>iRr,map:()=>oCs,loadConfigsForDefaultMode:()=>oRr,isSerializableHeaderValue:()=>OEu,getValueFromTextNode:()=>rCs,getDefaultExtensionConfiguration:()=>Man,getDefaultClientConfiguration:()=>DEu,getArrayIfSingleItem:()=>PEu,extendedEncodeURIComponent:()=>jEs.extendedEncodeURIComponent,emitWarningIfUnsupportedVersion:()=>sRr,decorateServiceException:()=>nRr,createAggregatedClient:()=>tRr,convertMap:()=>LEu,collectBody:()=>Ebs.collectBody,_json:()=>aRr,ServiceException:()=>VCe,SENSITIVE_STRING:()=>HEu,NoOpLogger:()=>Nan,Command:()=>cQ,Client:()=>Oan});
var n7=b(()=>{bbs();Cbs();GEs();KEs();rRr();YEs();nCs();aCs();autofixError($v,x(b3(),1),module.exports)});
export {UEu,$Eu,aRr,$v,n7};
