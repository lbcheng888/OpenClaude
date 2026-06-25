// @ts-nocheck
import {M$,av,vw} from "./m5178.ts";
import {He,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {hf,RE} from "../src/session/2796_uuid.ts";
import {b} from "../runtime.ts";
import {I6n,H6n} from "./m4236.ts";
function t_o(e){return typeof e==="object"&&e!==null&&"type"in e&&e.type==="dream"}
function sja(e,t){let n=M$("dream"),r={...av(n,"dream","dreaming"),type:"dream",status:"running",skipTranscript:!0,phase:"starting",sessionsReviewing:t.sessionsReviewing,filesTouched:[],turns:[],abortController:t.abortController,priorMtime:t.priorMtime};return e.register(r),n}
function ija(e,t,n,r){r.update(e,(o)=>{let s=new Set(o.filesTouched),i=n.filter((a)=>!s.has(a)&&s.add(a));if(t.text===""&&t.toolUseCount===0&&i.length===0)return o;return{...o,phase:i.length>0?"updating":o.phase,filesTouched:i.length>0?[...o.filesTouched,...i]:o.filesTouched,turns:o.turns.slice(-(yUp-1)).concat(t)}})}
function aja(e,t){t.update(e,(n)=>({...n,status:"completed",endTime:Date.now(),notified:!0,abortController:void 0})),He("task_dream"),hf(e,"completed",{skipTranscript:!0})}
function lja(e,t){t.update(e,(n)=>({...n,status:"failed",endTime:Date.now(),notified:!0,abortController:void 0})),xe("task_dream","task_dream_failed"),hf(e,"failed",{skipTranscript:!0})}
var yUp=30,x6n;
var D6n=b(()=>{mn();I6n();vw();RE();x6n={name:"DreamTask",type:"dream",async kill(e,t){let n;if(t.update(e,(r)=>{if(r.status!=="running")return r;return r.abortController?.abort(),n=r.priorMtime,{...r,status:"killed",endTime:Date.now(),notified:!0,abortController:void 0}}),n!==void 0)hf(e,"stopped",{skipTranscript:!0}),await H6n(n)}}});
export {t_o,sja,ija,aja,lja,yUp,x6n,D6n};
