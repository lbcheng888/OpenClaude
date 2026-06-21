// @ts-nocheck
import {b} from "../runtime.ts";
import {SH} from "./m135.ts";
var sT=(e)=>{if(typeof globalThis.process<"u")return globalThis.process.env?.[e]?.trim()||void 0;if(typeof globalThis.Deno<"u")return globalThis.Deno.env?.get?.(e)?.trim()||void 0;return};
function u$o(e){let t=0;for(let o of e)t+=o.length;let n=new Uint8Array(t),r=0;for(let o of e)n.set(o,r),r+=o.length;return n}
function QWe(e){let t;return(l$o??(t=new globalThis.TextEncoder,l$o=t.encode.bind(t)))(e)}
function Drr(e){let t;return(c$o??(t=new globalThis.TextDecoder,c$o=t.decode.bind(t)))(e)}
var l$o,c$o;
var d$o=b(()=>{SH()});
export {sT,u$o,QWe,Drr,l$o,c$o,d$o};
