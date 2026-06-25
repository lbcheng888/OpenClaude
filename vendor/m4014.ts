// @ts-nocheck
import {Tl,mn} from "../src/telemetry/0600_feature_name.ts";
import {Vs,lT} from "./m2195.ts";
import {b} from "../runtime.ts";
async function m3a(e){return Tl("api_admin_request_create",async()=>{let t=await Vs.post("/api/oauth/organizations/:orgUUID/admin_requests",e,{auth:"teleport-org"});if(!t.ok)throw Error(t.reason==="no-auth"?t.detail:`admin_requests: ${t.reason}`);return t.data})}
async function f3a(e,t){return Tl("api_admin_request_list",async()=>{let n=new URLSearchParams({request_type:e});for(let o of t)n.append("statuses",o);let r=await Vs.get(`/api/oauth/organizations/:orgUUID/admin_requests/me?${n}`,{auth:"teleport-org"});if(!r.ok)throw Error(r.reason==="no-auth"?r.detail:`admin_requests/me: ${r.reason}`);return r.data})}
async function h3a(e){return Tl("api_admin_request_eligibility",async()=>{let t=await Vs.get(`/api/oauth/organizations/:orgUUID/admin_requests/eligibility?request_type=${e}`,{auth:"teleport-org"});if(!t.ok)throw Error(t.reason==="no-auth"?t.detail:`admin_requests/eligibility: ${t.reason}`);return t.data})}
var g3a=b(()=>{mn();lT()});
export {m3a,f3a,h3a,g3a};
