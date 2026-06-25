// @ts-nocheck
import {b} from "../runtime.ts";
import {jfn} from "./m1622.ts";
var Yfn=(e)=>{if(typeof globalThis.process<"u")return globalThis.process.env?.[e]?.trim()??void 0;if(typeof globalThis.Deno<"u")return globalThis.Deno.env?.get?.(e)?.trim();return};
var Wzs=b(()=>{jfn()});
export {Yfn,Wzs};
