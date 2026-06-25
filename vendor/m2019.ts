// @ts-nocheck
import {b} from "../runtime.ts";
import {YH} from "./m137.ts";
var Cyn=(e)=>{if(typeof globalThis.process<"u")return globalThis.process.env?.[e]?.trim()||void 0;if(typeof globalThis.Deno<"u")return globalThis.Deno.env?.get?.(e)?.trim()||void 0;return};
var eai=b(()=>{YH()});
export {Cyn,eai};
