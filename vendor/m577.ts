// @ts-nocheck
import {IGo,ooe} from "./m455.ts";
import {b} from "../runtime.ts";
import {PGo,Gdr} from "../src/config/0457_USE_STAGING_OAUTH.ts";
import {OGo,Vdr} from "../src/config/0458_OTEL_TRACES_EXPORT_INTERVAL.ts";
import {wen,n7e} from "../src/config/0571_externalHttp.ts";
import {Qzo,fmr} from "../src/config/0572_USE_API_CONTEXT_MANAGEMENT.ts";
import {Zzo,Amr} from "./m572.ts";
import {eYo,hmr} from "../src/config/0574_VOICE_STREAM_BASE_URL.ts";
import {tYo,gmr} from "../src/config/0575_FALLBACK_FOR_ALL_PRIMARY_MODELS.ts";
import {nYo,_mr} from "../src/config/0576_NO_PROXY.ts";
import {rYo,ymr} from "../src/config/0577__CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL.ts";
function oYo(e,t){let n=Object.create(t);for(let[r,o]of Object.entries(e)){let s=n,i;Object.defineProperty(n,r,{get:()=>{let a=process.env[r];if(a!==s)i=o.parse(a),s=a;return i},enumerable:!0,configurable:!0})}return Object.defineProperties(n,{set:{value:(r,o)=>{process.env[r]=IGo(o)}},unset:{value:(r)=>{delete process.env[r]}}}),n}
var GGc,je,VGc,tbe;
var tk=b(()=>{PGo();OGo();wen();Qzo();Zzo();eYo();tYo();nYo();rYo();ooe();wen();GGc={...Gdr,...ymr,...gmr,...fmr,..._mr,...Amr,...Vdr,...hmr};je=oYo(GGc,n7e),VGc={},tbe=oYo(VGc,null)});
export {oYo,GGc,je,VGc,tbe,tk};
