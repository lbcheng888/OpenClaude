// @ts-nocheck
import {getSettingsWithErrors,getSettingsFilePathForSource,getLocalSettingsValidationErrors,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {getMcpConfigsByScope,px} from "../src/telemetry/3148_unwrapCcrProxyUrl.ts";
import {b} from "../runtime.ts";
function EHe(){let e=getSettingsWithErrors(),n=["user","project","local"].flatMap((r)=>getMcpConfigsByScope(r).errors);return{settings:e.settings,errors:[...e.errors,...n]}}
function ONn(){let e=getSettingsFilePathForSource("localSettings");return[...EHe().errors.filter((n)=>!n.mcpErrorMetadata&&n.severity!=="warning"&&n.file!==e),...getLocalSettingsValidationErrors()]}
var kat=b(()=>{px();yr()});
export {EHe,ONn,kat};
