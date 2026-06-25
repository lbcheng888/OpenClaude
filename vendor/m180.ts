// @ts-nocheck
import {b} from "../runtime.ts";
import {dk,UT} from "./m154.ts";
import {oA,Jd,is} from "./m158.ts";
import {u0,oa} from "./m159.ts";
var Rbt;
var Klr=b(()=>{dk();oA();u0();Rbt=class Rbt extends Jd{list(e,t={},n){let{betas:r,...o}=t??{};return this._client.getAPIList(oa`/v1/sessions/${e}/events?beta=true`,UT,{query:o,...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}send(e,t,n){let{betas:r,...o}=t;return this._client.post(oa`/v1/sessions/${e}/events?beta=true`,{body:o,...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}stream(e,t={},n){let{betas:r}=t??{};return this._client.get(oa`/v1/sessions/${e}/events/stream?beta=true`,{...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers]),stream:!0})}}});
export {Rbt,Klr};
