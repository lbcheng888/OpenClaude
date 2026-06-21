// @ts-nocheck
import {Ua,ty} from "./m2245.ts";
import {zc,ex} from "./m2582.ts";
import {Ds,Iu} from "./m643.ts";
import {tQ,mc} from "../src/config/0645_maxBytes.ts";
import {eQ,bB} from "./m634.ts";
import {yae,xk} from "./m2715.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {createAttachmentMessage,Bv} from "../src/agent/4429_tryGetPDFReference.ts";
import {b} from "../runtime.ts";
function N3n(e,t,n,r){if(e!==Ua&&e!==zc)return null;if(typeof n!=="object"||n===null||!("file_path"in n)||typeof n.file_path!=="string")return null;try{let o=Ds(n.file_path),s=r.get(o);if(!s||s.offset!==void 0||s.limit!==void 0)return null;let i=tQ(o);if(i<=s.timestamp)return null;let a=eQ(o);if(r.set(o,{content:a.content,timestamp:i,offset:void 0,limit:void 0}),yae(s,a.content))return null;return logForDebugging(`PostToolUse hook modified ${o} after ${e} \u2014 re-synced readFileState`,{level:"info"}),createAttachmentMessage({type:"hook_additional_context",content:[`PostToolUse hook modified ${o} after your edit (likely a formatter). Your next Edit will not fail with a stale-file error, but if its old_string targets a region the hook reformatted, Read the file first.`],hookName:`PostToolUse:${e}`,toolUseID:t,hookEvent:"PostToolUse"})}catch{return null}}
var hpo=b(()=>{ty();ex();Bv();qe();mc();bB();xk();Iu()});
export {N3n,hpo};
