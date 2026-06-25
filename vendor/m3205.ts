// @ts-nocheck
import {F0,URe} from "./m2043.ts";
import {li,Qy} from "../src/tools/0325_ttl.ts";
import {b} from "../runtime.ts";
function bDn(e){if(e instanceof F0)return!0;if(e instanceof Error&&!(e instanceof li)&&"code"in e){if(e.code===403)return!e.message.includes("Server returned 403 after trying upscoping");if(e.code===401)return!e.message.includes("Server returned 401 after successful authentication")}return!1}
var oQr=b(()=>{URe();Qy()});
export {bDn,oQr};
