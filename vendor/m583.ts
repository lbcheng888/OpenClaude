// @ts-nocheck
import {kJo,noe} from "./m461.ts";
import {b} from "../runtime.ts";
import {IJo,Sgr} from "../src/config/0463_USE_STAGING_OAUTH.ts";
import {xJo,bgr} from "../src/config/0464_OTEL_TRACES_EXPORT_INTERVAL.ts";
import {arn,eje} from "../src/config/0577_externalHttp.ts";
import {Yes,W_r} from "../src/config/0578_USE_API_CONTEXT_MANAGEMENT.ts";
import {Jes,G_r} from "./m578.ts";
import {Xes,V_r} from "../src/config/0580_VOICE_STREAM_BASE_URL.ts";
import {Qes,K_r} from "../src/config/0581_FALLBACK_FOR_ALL_PRIMARY_MODELS.ts";
import {Zes,z_r} from "../src/config/0582_NO_PROXY.ts";
import {ets,j_r} from "../src/config/0583__CLAUDE_CODE_ASSUME_FIRST_PARTY_BASE_URL.ts";
function tts(e,t){let n=Object.create(t);for(let[r,o]of Object.entries(e)){let s=n,i;Object.defineProperty(n,r,{get:()=>{let a=process.env[r];if(a!==s)i=o.parse(a),s=a;return i},enumerable:!0,configurable:!0})}return Object.defineProperties(n,{set:{value:(r,o)=>{process.env[r]=kJo(o)}},unset:{value:(r)=>{delete process.env[r]}}}),n}
var ltu,Ne,ctu,IK;
var AR=b(()=>{IJo();xJo();arn();Yes();Jes();Xes();Qes();Zes();ets();noe();arn();ltu={...Sgr,...j_r,...K_r,...W_r,...z_r,...G_r,...bgr,...V_r};Ne=tts(ltu,eje),ctu={},IK=tts(ctu,null)});
export {tts,ltu,Ne,ctu,IK,AR};
