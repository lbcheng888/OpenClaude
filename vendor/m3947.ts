// @ts-nocheck
import {Ul,ln} from "../src/telemetry/0594_feature_name.ts";
import {si,gT} from "./m2190.ts";
import {b} from "../runtime.ts";
async function qMa(e){return Ul("api_admin_request_create",async()=>{let t=await si.post("/api/oauth/organizations/:orgUUID/admin_requests",e,{auth:"teleport-org"});if(!t.ok)throw Error(t.reason==="no-auth"?t.detail:`admin_requests: ${t.reason}`);return t.data})}
async function jMa(e,t){return Ul("api_admin_request_list",async()=>{let n=new URLSearchParams({request_type:e});for(let o of t)n.append("statuses",o);let r=await si.get(`/api/oauth/organizations/:orgUUID/admin_requests/me?${n}`,{auth:"teleport-org"});if(!r.ok)throw Error(r.reason==="no-auth"?r.detail:`admin_requests/me: ${r.reason}`);return r.data})}
async function WMa(e){return Ul("api_admin_request_eligibility",async()=>{let t=await si.get(`/api/oauth/organizations/:orgUUID/admin_requests/eligibility?request_type=${e}`,{auth:"teleport-org"});if(!t.ok)throw Error(t.reason==="no-auth"?t.detail:`admin_requests/eligibility: ${t.reason}`);return t.data})}
var GMa=b(()=>{ln();gT()});
export {qMa,jMa,WMa,GMa};
