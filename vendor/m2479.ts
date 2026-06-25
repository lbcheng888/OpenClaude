// @ts-nocheck
import {Q} from "../runtime.ts";
var Tie=Q((xRg,SDi)=>{/*!
  Copyright 2013 Lovell Fuller and others.
  SPDX-License-Identifier: Apache-2.0
*/var TDi=(e)=>typeof e<"u"&&e!==null,kTd=(e)=>typeof e==="object",HTd=(e)=>Object.prototype.toString.call(e)==="[object Object]",ITd=(e)=>typeof e==="function",xTd=(e)=>typeof e==="boolean",DTd=(e)=>e instanceof Buffer,PTd=(e)=>{if(TDi(e))switch(e.constructor){case Uint8Array:case Uint8ClampedArray:case Int8Array:case Uint16Array:case Int16Array:case Uint32Array:case Int32Array:case Float32Array:case Float64Array:return!0}return!1},OTd=(e)=>e instanceof ArrayBuffer,LTd=(e)=>typeof e==="string"&&e.length>0,MTd=(e)=>typeof e==="number"&&!Number.isNaN(e),NTd=(e)=>Number.isInteger(e),FTd=(e,t,n)=>e>=t&&e<=n,BTd=(e,t)=>t.includes(e),UTd=(e,t,n)=>Error(`Expected ${t} for ${e} but received ${n} of type ${typeof n}`),$Td=(e,t)=>(t.message=e.message,t);SDi.exports={defined:TDi,object:kTd,plainObject:HTd,fn:ITd,bool:xTd,buffer:DTd,typedArray:PTd,arrayBuffer:OTd,string:LTd,number:MTd,integer:NTd,inRange:FTd,inArray:BTd,invalidParameterError:UTd,nativeError:$Td}});
export {Tie};
