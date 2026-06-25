// @ts-nocheck
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
var qpl;
var Wpl=b(()=>{Qr();qpl=ve(()=>{let e=C.object({enable_email:C.boolean().nullish(),enable_push:C.boolean().nullish()}),t=C.object({bogosort:e.nullish(),code_requires_action:e.nullish()}),n=C.object({has_active_channel:C.boolean(),platforms:C.array(C.string()).nullish().transform((r)=>r??[]),most_recent_token_refresh:C.string().nullish()});return C.object({account_id:C.number().nullish(),organization_id:C.number().nullish(),preferences:C.object({feature_preference:t.nullish()}).nullish(),push_reachability:n.nullish()})})});
export {qpl,Wpl};
