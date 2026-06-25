// @ts-nocheck
import {b} from "../runtime.ts";
import {YH} from "./m137.ts";
var runStartupDialog=(e)=>{if(typeof globalThis.process<"u")return globalThis.process.env?.[e]?.trim()||void 0;if(typeof globalThis.Deno<"u")return globalThis.Deno.env?.get?.(e)?.trim()||void 0;return};
function t5o(e){let t=0;for(let o of e)t+=o.length;let n=new Uint8Array(t),r=0;for(let o of e)n.set(o,r),r+=o.length;return n}
function jKe(e){let t;return(Z6o??(t=new globalThis.TextEncoder,Z6o=t.encode.bind(t)))(e)}
function alr(e){let t;return(e5o??(t=new globalThis.TextDecoder,e5o=t.decode.bind(t)))(e)}
var Z6o,e5o;
var n5o=b(()=>{YH()});
export {runStartupDialog,t5o,jKe,alr,Z6o,e5o,n5o};
