// @ts-nocheck
import {d9,uI,Ax} from "./m5146.ts";
import {Ie,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {Bh,bC} from "../src/session/2784_uuid.ts";
import {b} from "../runtime.ts";
import {C3n,E3n} from "./m4218.ts";
function ipo(e){return typeof e==="object"&&e!==null&&"type"in e&&e.type==="dream"}
function F8a(e,t){let n=d9("dream"),r={...uI(n,"dream","dreaming"),type:"dream",status:"running",skipTranscript:!0,phase:"starting",sessionsReviewing:t.sessionsReviewing,filesTouched:[],turns:[],abortController:t.abortController,priorMtime:t.priorMtime};return e.register(r),n}
function U8a(e,t,n,r){r.update(e,(o)=>{let s=new Set(o.filesTouched),i=n.filter((a)=>!s.has(a)&&s.add(a));if(t.text===""&&t.toolUseCount===0&&i.length===0)return o;return{...o,phase:i.length>0?"updating":o.phase,filesTouched:i.length>0?[...o.filesTouched,...i]:o.filesTouched,turns:o.turns.slice(-(ZDp-1)).concat(t)}})}
function $8a(e,t){t.update(e,(n)=>({...n,status:"completed",endTime:Date.now(),notified:!0,abortController:void 0})),Ie("task_dream"),Bh(e,"completed",{skipTranscript:!0})}
function q8a(e,t){t.update(e,(n)=>({...n,status:"failed",endTime:Date.now(),notified:!0,abortController:void 0})),Oe("task_dream","task_dream_failed"),Bh(e,"failed",{skipTranscript:!0})}
var ZDp=30,v3n;
var w3n=b(()=>{ln();C3n();Ax();bC();v3n={name:"DreamTask",type:"dream",async kill(e,t){let n;if(t.update(e,(r)=>{if(r.status!=="running")return r;return r.abortController?.abort(),n=r.priorMtime,{...r,status:"killed",endTime:Date.now(),notified:!0,abortController:void 0}}),n!==void 0)Bh(e,"stopped",{skipTranscript:!0}),await E3n(n)}}});
export {ipo,F8a,U8a,$8a,q8a,ZDp,v3n,w3n};
