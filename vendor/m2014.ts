// @ts-nocheck
import {b} from "../runtime.ts";
import {SH} from "./m135.ts";
var $An=(e)=>{if(typeof globalThis.process<"u")return globalThis.process.env?.[e]?.trim()||void 0;if(typeof globalThis.Deno<"u")return globalThis.Deno.env?.get?.(e)?.trim()||void 0;return};
var sti=b(()=>{SH()});
export {$An,sti};
