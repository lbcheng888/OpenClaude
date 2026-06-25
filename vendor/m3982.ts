// @ts-nocheck
import {CLASSIFIER_UNAVAILABLE_REASON,jN} from "./m721.ts";
import {b} from "../runtime.ts";
import {jn} from "../src/api/2204_stopPeriodicGrowthBookRefresh.ts";
import {AR} from "./m583.ts";
function M$a(e){if(e.behavior==="ask")return"user-rejected";let t=e.decisionReason;if(t.type==="classifier"&&t.classifier==="auto-mode"){if(t.reason===CLASSIFIER_UNAVAILABLE_REASON)return"automode-unavailable";if(t.reason.startsWith(Pdo))return"automode-parsing-error";return"automode-blocked"}return"permission-rule"}
function hye(){return!1}
var Pdo="Auto mode could not evaluate this action and is blocking it for safety";
var C9n=b(()=>{jn();jN();AR()});
export {M$a,hye,Pdo,C9n};
