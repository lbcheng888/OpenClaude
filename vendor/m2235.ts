// @ts-nocheck
import {getInitialSettings,br} from "../src/config/0745_updateSettingsForSource.ts";
import {getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {getSystemPromptSectionCache,lt} from "../src/session/0132_sent.ts";
import {b} from "../runtime.ts";
function X$r(e){return!1}
function F2(e){return e.type==="fallback"}
function Aet(){let e=getInitialSettings().viewMode;return e?e==="focus":getGlobalConfig().briefTranscript??!1}
function EDt(){for(let e of vld)getSystemPromptSectionCache().delete(`focus_mode${e}`)}
var vld;
var Ret=b(()=>{lt();tr();br();vld=["",":L"]});
export {X$r,F2,Aet,EDt,vld,Ret};
