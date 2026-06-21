// @ts-nocheck
import {b} from "../runtime.ts";
function TDl(e){let t=new AbortController;function n(){t.abort(),t=new AbortController}function r(){let o=new AbortController,s=()=>o.abort();if(e.aborted||t.signal.aborted)return o.abort(),{signal:o.signal,cleanup:()=>{}};e.addEventListener("abort",s,{once:!0});let i=t.signal;return i.addEventListener("abort",s,{once:!0}),{signal:o.signal,cleanup:()=>{e.removeEventListener("abort",s),i.removeEventListener("abort",s)}}}return{signal:r,wake:n}}
var Oft;
var SDl=b(()=>{Oft={poll_interval_ms_not_at_capacity:2000,poll_interval_ms_at_capacity:600000,non_exclusive_heartbeat_interval_ms:0,multisession_poll_interval_ms_not_at_capacity:2000,multisession_poll_interval_ms_partial_capacity:2000,multisession_poll_interval_ms_at_capacity:600000,reclaim_older_than_ms:5000,session_keepalive_interval_v2_ms:120000}});
export {TDl,Oft,SDl};
