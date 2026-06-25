// @ts-nocheck
import {L$,Gca,Vca,qDn} from "../src/computer-use/3227_level.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Pt,He,mn} from "../src/telemetry/0600_feature_name.ts";
import {b} from "../runtime.ts";
function Kca(e){if(OFt)return!0;if(!L$().hotkey.registerEscape(e))return logForDebugging("[cu-esc] registerEscape returned false",{level:"warn"}),Pt("computeruse_esc_register","tap_create_failed"),!1;return Gca(),OFt=!0,logForDebugging("[cu-esc] registered"),He("computeruse_esc_register"),!0}
function zca(){if(!OFt)return;try{L$().hotkey.unregister()}finally{Vca(),OFt=!1,logForDebugging("[cu-esc] unregistered")}}
function UQr(){if(!OFt)return;L$().hotkey.notifyExpectedEscape()}
var OFt=!1;
var WDn=b(()=>{mn();qe();qDn()});
export {Kca,zca,UQr,OFt,WDn};
