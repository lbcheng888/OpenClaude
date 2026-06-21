// @ts-nocheck
import {u9,Fna,Una,XHn} from "../src/computer-use/3211_level.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {isTmuxControlMode,Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {b} from "../runtime.ts";
function $na(e){if(n1t)return!0;if(!u9().hotkey.registerEscape(e))return logForDebugging("[cu-esc] registerEscape returned false",{level:"warn"}),isTmuxControlMode("computeruse_esc_register","tap_create_failed"),!1;return Fna(),n1t=!0,logForDebugging("[cu-esc] registered"),Ie("computeruse_esc_register"),!0}
function qna(){if(!n1t)return;try{u9().hotkey.unregister()}finally{Una(),n1t=!1,logForDebugging("[cu-esc] unregistered")}}
function ozr(){if(!n1t)return;u9().hotkey.notifyExpectedEscape()}
var n1t=!1;
var QHn=b(()=>{ln();qe();XHn()});
export {$na,qna,ozr,n1t,QHn};
