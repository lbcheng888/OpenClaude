// @ts-nocheck
import {saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {He,mn} from "../src/telemetry/0600_feature_name.ts";
import {b} from "../runtime.ts";
function Wfc(){let e=!1;if(saveGlobalConfig((t)=>{let n=t.replBridgeEnabled;if(n===void 0)return t;if(t.remoteControlAtStartup!==void 0)return t;let r={...t,remoteControlAtStartup:Boolean(n)};return delete r.replBridgeEnabled,e=!0,r}),e)He("migration_repl_bridge_to_remote_control")}
var Gfc=b(()=>{mn();tr()});
export {Wfc,Gfc};
