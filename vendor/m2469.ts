// @ts-nocheck
import {X} from "../runtime.ts";
var Cie=X((Jph,Zwi)=>{/*!
  Copyright 2013 Lovell Fuller and others.
  SPDX-License-Identifier: Apache-2.0
*/var Qwi=(e)=>typeof e<"u"&&e!==null,ocd=(e)=>typeof e==="object",scd=(e)=>Object.prototype.toString.call(e)==="[object Object]",icd=(e)=>typeof e==="function",acd=(e)=>typeof e==="boolean",lcd=(e)=>e instanceof Buffer,ccd=(e)=>{if(Qwi(e))switch(e.constructor){case Uint8Array:case Uint8ClampedArray:case Int8Array:case Uint16Array:case Int16Array:case Uint32Array:case Int32Array:case Float32Array:case Float64Array:return!0}return!1},ucd=(e)=>e instanceof ArrayBuffer,dcd=(e)=>typeof e==="string"&&e.length>0,pcd=(e)=>typeof e==="number"&&!Number.isNaN(e),mcd=(e)=>Number.isInteger(e),fcd=(e,t,n)=>e>=t&&e<=n,Acd=(e,t)=>t.includes(e),hcd=(e,t,n)=>Error(`Expected ${t} for ${e} but received ${n} of type ${typeof n}`),gcd=(e,t)=>(t.message=e.message,t);Zwi.exports={defined:Qwi,object:ocd,plainObject:scd,fn:icd,bool:acd,buffer:lcd,typedArray:ccd,arrayBuffer:ucd,string:dcd,number:pcd,integer:mcd,inRange:fcd,inArray:Acd,invalidParameterError:hcd,nativeError:gcd}});
export {Cie};
