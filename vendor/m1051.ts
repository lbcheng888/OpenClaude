// @ts-nocheck
import {ft,b,autofixError,x} from "../runtime.ts";
import {Kvu,vHs,wHs} from "./m1045.ts";
import {Qvu,$Hs,BHs,Jvu,FHs,Yvu,Xvu,Fln,qHs} from "./m1050.ts";
import {vvr,Nln,jvu} from "./m1048.ts";
import {Avr,HHs,Rvr,IHs} from "./m1046.ts";
import {Evr,bvr,sAe,Vvu,Cvr} from "./m1044.ts";
import {rks,oks} from "./m1028.ts";
import {$Command,RHs} from "./m1043.ts";
import {__Client,nks} from "./m1027.ts";
import {NHs} from "./m1049.ts";
import {b3} from "./m827.ts";
var nwu=(e)=>{if(e!==e)return"NaN";switch(e){case 1/0:return"Infinity";case-1/0:return"-Infinity";default:return e}},rwu=(e)=>e.toISOString().replace(".000Z","Z");
var wvr=(e)=>{if(e==null)return{};if(Array.isArray(e))return e.filter((t)=>t!=null).map(wvr);if(typeof e==="object"){let t={};for(let n of Object.keys(e)){if(e[n]==null)continue;t[n]=wvr(e[n])}return t}return e};
var enforcementWarnDedup={};
ft(enforcementWarnDedup,{withBaseException:()=>Kvu,throwDefaultError:()=>vHs,take:()=>Qvu,serializeFloat:()=>nwu,serializeDateTime:()=>rwu,resolvedPath:()=>$Hs.resolvedPath,resolveDefaultRuntimeConfig:()=>vvr,map:()=>BHs,loadConfigsForDefaultMode:()=>Avr,isSerializableHeaderValue:()=>Jvu,getValueFromTextNode:()=>FHs,getDefaultExtensionConfiguration:()=>Nln,getDefaultClientConfiguration:()=>jvu,getArrayIfSingleItem:()=>Yvu,extendedEncodeURIComponent:()=>HHs.extendedEncodeURIComponent,emitWarningIfUnsupportedVersion:()=>Rvr,decorateServiceException:()=>Evr,createAggregatedClient:()=>bvr,convertMap:()=>Xvu,collectBody:()=>rks.collectBody,_json:()=>wvr,ServiceException:()=>sAe,SENSITIVE_STRING:()=>Vvu,NoOpLogger:()=>Fln,Command:()=>$Command,Client:()=>__Client});
var $s=b(()=>{nks();oks();RHs();wHs();Cvr();IHs();NHs();qHs();autofixError(enforcementWarnDedup,x(b3(),1),module.exports)});
export {nwu,rwu,wvr,enforcementWarnDedup,$s};
