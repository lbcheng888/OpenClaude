// @ts-nocheck
import {isFullscreenWithTTY,b,Yo,M} from "../runtime.ts";
import {mru,xls,kls} from "./m834.ts";
import {bru,Gls,jls,Tru,$ls,yru,Sru,qls,Vls} from "./m839.ts";
import {_ru,Bls,gru} from "./m837.ts";
import {Aru,Ils,hru,Dls} from "./m835.ts";
import {a_r,pru,xKe,dru,l_r} from "./m833.ts";
import {Sls,bls} from "./m830.ts";
import {i_r,Rls} from "./m832.ts";
import {nis,ris} from "./m782.ts";
import {Uls} from "./m838.ts";
import {n4} from "./m822.ts";
var wru=(e)=>{if(e!==e)return"NaN";switch(e){case 1/0:return"Infinity";case-1/0:return"-Infinity";default:return e}},Rru=(e)=>e.toISOString().replace(".000Z","Z");
var c_r=(e)=>{if(e==null)return{};if(Array.isArray(e))return e.filter((t)=>t!=null).map(c_r);if(typeof e==="object"){let t={};for(let n of Object.keys(e)){if(e[n]==null)continue;t[n]=c_r(e[n])}return t}return e};
var uv={};
isFullscreenWithTTY(uv,{withBaseException:()=>mru,throwDefaultError:()=>xls,take:()=>bru,serializeFloat:()=>wru,serializeDateTime:()=>Rru,resolvedPath:()=>Gls.resolvedPath,resolveDefaultRuntimeConfig:()=>_ru,map:()=>jls,loadConfigsForDefaultMode:()=>Aru,isSerializableHeaderValue:()=>Tru,getValueFromTextNode:()=>$ls,getDefaultExtensionConfiguration:()=>Bls,getDefaultClientConfiguration:()=>gru,getArrayIfSingleItem:()=>yru,extendedEncodeURIComponent:()=>Ils.extendedEncodeURIComponent,emitWarningIfUnsupportedVersion:()=>hru,decorateServiceException:()=>a_r,createAggregatedClient:()=>pru,convertMap:()=>Sru,collectBody:()=>Sls.collectBody,_json:()=>c_r,ServiceException:()=>xKe,SENSITIVE_STRING:()=>dru,NoOpLogger:()=>qls,Command:()=>i_r,Client:()=>nis});
var Kls=b(()=>{ris();bls();Rls();kls();l_r();Dls();Uls();Vls();Yo(uv,M(n4(),1),module.exports)});
export {wru,Rru,c_r,uv,Kls};
