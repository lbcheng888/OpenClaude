// @ts-nocheck
import {uE,h$,L1} from "./m2232.ts";
import {getSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {isProjectScopeTrustAccepted,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {b} from "../runtime.ts";
function ije(e){return uE()?getSettingsForSource("policySettings")?.statusLine:e}
function Jjn(e){if(h$())return;if(!isProjectScopeTrustAccepted())return;return uE()?getSettingsForSource("policySettings")?.fileSuggestion:e}
var Bqt=b(()=>{Qn();yr();L1()});
export {ije,Jjn,Bqt};
