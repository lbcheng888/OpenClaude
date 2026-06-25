// @ts-nocheck
import {hf,RE} from "../src/session/2796_uuid.ts";
import {p_,wE} from "./m5177.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {b} from "../runtime.ts";
function YA(e){return typeof e==="object"&&e!==null&&"type"in e&&e.type==="local_bash"}
function dLn(e){for(let t of Object.values(e)){if(t.status!=="running")continue;try{if(YA(t))t.shellCommand?.kill(),t.shellCommand?.cleanup();else if("abortController"in t)t.abortController?.abort();hf(t.id,"stopped",{toolUseId:t.toolUseId,summary:t.description}),p_(t.id)}catch(n){Ie(n)}}}
var hno=b(()=>{vn();RE();wE()});
export {YA,dLn,hno};
