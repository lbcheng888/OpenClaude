// @ts-nocheck
import {fa,ry} from "./m2253.ts";
import {Ec,dw} from "./m2593.ts";
import {hs,Tu} from "./m649.ts";
import {QX,Xl} from "../src/config/0651_maxBytes.ts";
import {XX,GN} from "./m640.ts";
import {gae,Gk} from "./m2727.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {createAttachmentMessage,GA} from "../src/agent/4451_tryGetPDFReference.ts";
import {b} from "../runtime.ts";
function G6n(e,t,n,r){if(e!==fa&&e!==Ec)return null;if(typeof n!=="object"||n===null||!("file_path"in n)||typeof n.file_path!=="string")return null;try{let o=hs(n.file_path),s=r.get(o);if(!s||s.offset!==void 0||s.limit!==void 0)return null;let i=QX(o);if(i<=s.timestamp)return null;let a=XX(o);if(r.set(o,{content:a.content,timestamp:i,offset:void 0,limit:void 0}),gae(s,a.content))return null;return logForDebugging(`PostToolUse hook modified ${o} after ${e} \u2014 re-synced readFileState`,{level:"info"}),createAttachmentMessage({type:"hook_additional_context",content:[`PostToolUse hook modified ${o} after your edit (likely a formatter). Your next Edit will not fail with a stale-file error, but if its old_string targets a region the hook reformatted, Read the file first.`],hookName:`PostToolUse:${e}`,toolUseID:t,hookEvent:"PostToolUse"})}catch{return null}}
var d_o=b(()=>{ry();dw();GA();qe();Xl();GN();Gk();Tu()});
export {G6n,d_o};
