// @ts-nocheck
import {b} from "../runtime.ts";
import {ppn} from "./m1617.ts";
var mpn=(e)=>{if(typeof globalThis.process<"u")return globalThis.process.env?.[e]?.trim()??void 0;if(typeof globalThis.Deno<"u")return globalThis.Deno.env?.get?.(e)?.trim();return};
var z8s=b(()=>{ppn()});
export {mpn,z8s};
