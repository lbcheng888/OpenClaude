// @ts-nocheck
import {isFirstPartyAnthropicBaseUrl,li} from "../src/api/1282_usesFirstPartyModelIds.ts";
import {is1PApiCustomer,Ao} from "../src/config/2031_withOAuthRefreshLock.ts";
import {b} from "../runtime.ts";
function oPe(){if(!isFirstPartyAnthropicBaseUrl())return!1;return is1PApiCustomer()}
var Iwo=b(()=>{Ao();li()});
export {oPe,Iwo};
