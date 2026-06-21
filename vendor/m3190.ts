// @ts-nocheck
import {T0,rve} from "./m2038.ts";
import {Oi,YT} from "../src/tools/0323_ttl.ts";
import {b} from "../runtime.ts";
function HHn(e){if(e instanceof T0)return!0;if(e instanceof Error&&!(e instanceof Oi)&&"code"in e){if(e.code===403)return!e.message.includes("Server returned 403 after trying upscoping");if(e.code===401)return!e.message.includes("Server returned 401 after successful authentication")}return!1}
var EKr=b(()=>{rve();YT()});
export {HHn,EKr};
