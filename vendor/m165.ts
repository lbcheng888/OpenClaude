// @ts-nocheck
import {b} from "../runtime.ts";
import {dk,UT} from "./m154.ts";
import {oA,Jd,is} from "./m158.ts";
import {u0,oa} from "./m159.ts";
var dbt;
var wlr=b(()=>{dk();oA();u0();dbt=class dbt extends Jd{list(e,t={},n){let{betas:r,...o}=t??{};return this._client.getAPIList(oa`/v1/agents/${e}/versions?beta=true`,UT,{query:o,...n,headers:is([{"anthropic-beta":[...r??[],"managed-agents-2026-04-01"].toString()},n?.headers])})}}});
export {dbt,wlr};
