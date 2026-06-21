// @ts-nocheck
import {getInitialSettings,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {getSystemPromptSectionCache,lt} from "../src/session/0131_sent.ts";
import {b} from "../runtime.ts";
function TBr(e){return!1}
function A$(e){return e.type==="fallback"}
function EQe(){let e=getInitialSettings().viewMode;return e?e==="focus":getGlobalConfig().briefTranscript??!1}
function KHt(){for(let e of nQu)getSystemPromptSectionCache().delete(`focus_mode${e}`)}
var nQu;
var CQe=b(()=>{lt();Qn();yr();nQu=["",":L"]});
export {TBr,A$,EQe,KHt,nQu,CQe};
