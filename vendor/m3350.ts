// @ts-nocheck
import {Bh,bC} from "../src/session/2784_uuid.ts";
import {iy,vC} from "./m5145.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {b} from "../runtime.ts";
function oI(e){return typeof e==="object"&&e!==null&&"type"in e&&e.type==="local_bash"}
function _Dn(e){for(let t of Object.values(e)){if(t.status!=="running")continue;try{if(oI(t))t.shellCommand?.kill(),t.shellCommand?.cleanup();else if("abortController"in t)t.abortController?.abort();Bh(t.id,"stopped",{toolUseId:t.toolUseId,summary:t.description}),iy(t.id)}catch(n){De(n)}}}
var PXr=b(()=>{Rn();bC();vC()});
export {oI,_Dn,PXr};
