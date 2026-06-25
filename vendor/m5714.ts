// @ts-nocheck
import {getGlobalConfig,saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {getSettingsForSource,ao,br} from "../src/config/0745_updateSettingsForSource.ts";
import {getMainLoopModelOverride,setMainLoopModelOverride,lt} from "../src/session/0132_sent.ts";
import {He,mn} from "../src/telemetry/0600_feature_name.ts";
import {b} from "../runtime.ts";
function Vfc(){if(getGlobalConfig().sonnet1m45MigrationComplete)return;let t=!1;if(getSettingsForSource("userSettings")?.model==="sonnet[1m]")ao("userSettings",{model:"sonnet-4-5-20250929[1m]"}),t=!0;if(getMainLoopModelOverride()==="sonnet[1m]")setMainLoopModelOverride("sonnet-4-5-20250929[1m]"),t=!0;if(saveGlobalConfig((o)=>({...o,sonnet1m45MigrationComplete:!0})),t)He("migration_sonnet1m_to_sonnet45")}
var Kfc=b(()=>{lt();mn();tr();br()});
export {Vfc,Kfc};
