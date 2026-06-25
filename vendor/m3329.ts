// @ts-nocheck
import {getSettings_DEPRECATED,br} from "../src/config/0745_updateSettingsForSource.ts";
import {I1,Lj,lq} from "./m5221.ts";
import {b} from "../runtime.ts";
function TIe(e,t){if(t)return e?`agent:builtin:${e}`:"agent:default";return e?`agent:custom:${e}`:"agent:custom"}
function IBt(){let t=getSettings_DEPRECATED()?.outputStyle??I1;if(t===I1)return"repl_main_thread";return t in Lj?`repl_main_thread:outputStyle:${t}`:"repl_main_thread:outputStyle:custom"}
var aat=b(()=>{lq();br()});
export {TIe,IBt,aat};
