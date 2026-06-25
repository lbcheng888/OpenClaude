// @ts-nocheck
import {eS,B2,zM} from "./m2240.ts";
import {getSettingsForSource,br} from "../src/config/0745_updateSettingsForSource.ts";
import {isProjectScopeTrustAccepted,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {b} from "../runtime.ts";
function P8e(e){return eS()?getSettingsForSource("policySettings")?.statusLine:e}
function _Vn(e){if(B2())return;if(!isProjectScopeTrustAccepted())return;return eS()?getSettingsForSource("policySettings")?.fileSuggestion:e}
var c8t=b(()=>{tr();br();zM()});
export {P8e,_Vn,c8t};
