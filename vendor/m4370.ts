// @ts-nocheck
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {zg} from "./m2752.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
var cJ;
var S4t=b(()=>{Xr();cJ=zg({kind:"refusal_fallback_prompt",payload:we(()=>E.object({originalModel:E.string(),fallbackModel:E.string(),apiRefusalCategory:E.string().nullable().optional(),guidanceText:E.string().optional(),retractedMessageUuids:E.array(E.string()).optional().describe("Wire uuids of the already-streamed messages this refusal concerns. Evict on RESOLUTION (your own response \u2014 any choice \u2014 or control_cancel_request retirement), never on receipt; a turn torn down mid-dialog keeps the partials. Eviction is idempotent.")})),result:we(()=>E.enum(["retry_fallback","edit_prompt","cancelled"])),default:"cancelled"})});
export {cJ,S4t};
