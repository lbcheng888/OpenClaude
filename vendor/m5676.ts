// @ts-nocheck
import {getGlobalConfig,saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {getSettingsForSource,updateSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {getMainLoopModelOverride,setMainLoopModelOverride,lt} from "../src/session/0131_sent.ts";
import {Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {b} from "../runtime.ts";
function nic(){if(getGlobalConfig().sonnet1m45MigrationComplete)return;let t=!1;if(getSettingsForSource("userSettings")?.model==="sonnet[1m]")updateSettingsForSource("userSettings",{model:"sonnet-4-5-20250929[1m]"}),t=!0;if(getMainLoopModelOverride()==="sonnet[1m]")setMainLoopModelOverride("sonnet-4-5-20250929[1m]"),t=!0;if(saveGlobalConfig((o)=>({...o,sonnet1m45MigrationComplete:!0})),t)Ie("migration_sonnet1m_to_sonnet45")}
var ric=b(()=>{lt();ln();Qn();yr()});
export {nic,ric};
