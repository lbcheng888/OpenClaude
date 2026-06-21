// @ts-nocheck
import {getSettings_DEPRECATED,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {hN,sY,Vq} from "./m5187.ts";
import {b} from "../runtime.ts";
function Dke(e,t){if(t)return e?`agent:builtin:${e}`:"agent:default";return e?`agent:custom:${e}`:"agent:custom"}
function eNt(){let t=getSettings_DEPRECATED()?.outputStyle??hN;if(t===hN)return"repl_main_thread";return t in sY?`repl_main_thread:outputStyle:${t}`:"repl_main_thread:outputStyle:custom"}
var lst=b(()=>{Vq();yr()});
export {Dke,eNt,lst};
