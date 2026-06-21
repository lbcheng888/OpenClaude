// @ts-nocheck
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
var eil;
var til=b(()=>{Xr();eil=we(()=>{let e=E.object({enable_email:E.boolean().nullish(),enable_push:E.boolean().nullish()}),t=E.object({bogosort:e.nullish(),code_requires_action:e.nullish()}),n=E.object({has_active_channel:E.boolean(),platforms:E.array(E.string()).nullish().transform((r)=>r??[]),most_recent_token_refresh:E.string().nullish()});return E.object({account_id:E.number().nullish(),organization_id:E.number().nullish(),preferences:E.object({feature_preference:t.nullish()}).nullish(),push_reachability:n.nullish()})})});
export {eil,til};
