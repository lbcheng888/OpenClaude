// @ts-nocheck
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {s_} from "./m2764.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
var VY;
var z6t=b(()=>{Qr();VY=s_({kind:"refusal_fallback_prompt",payload:ve(()=>C.object({originalModel:C.string(),fallbackModel:C.string(),apiRefusalCategory:C.string().nullable().optional(),guidanceText:C.string().optional(),retractedMessageUuids:C.array(C.string()).optional().describe("Wire uuids of the already-streamed messages this refusal concerns. Evict on RESOLUTION (your own response \u2014 any choice \u2014 or control_cancel_request retirement), never on receipt; a turn torn down mid-dialog keeps the partials. Eviction is idempotent.")})),result:ve(()=>C.enum(["retry_fallback","edit_prompt","cancelled"])),default:"cancelled"})});
export {VY,z6t};
