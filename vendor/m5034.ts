// @ts-nocheck
import {isFirstPartyAnthropicBaseUrl,Ps} from "../src/api/1287_usesFirstPartyModelIds.ts";
import {is1PApiCustomer,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {b} from "../runtime.ts";
function nOe(){if(!isFirstPartyAnthropicBaseUrl())return!1;return is1PApiCustomer()}
var G0o=b(()=>{lo();Ps()});
export {nOe,G0o};
