// @ts-nocheck
import {saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {b} from "../runtime.ts";
function eic(){let e=!1;if(saveGlobalConfig((t)=>{let n=t.replBridgeEnabled;if(n===void 0)return t;if(t.remoteControlAtStartup!==void 0)return t;let r={...t,remoteControlAtStartup:Boolean(n)};return delete r.replBridgeEnabled,e=!0,r}),e)Ie("migration_repl_bridge_to_remote_control")}
var tic=b(()=>{ln();Qn()});
export {eic,tic};
