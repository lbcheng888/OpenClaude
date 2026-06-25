// @ts-nocheck
import {getSettingsWithErrors,getSettingsFilePathForSource,getLocalSettingsValidationErrors,br} from "../src/config/0745_updateSettingsForSource.ts";
import {getMcpConfigsByScope,KA} from "../src/telemetry/3158_unwrapCcrProxyUrl.ts";
import {b} from "../runtime.ts";
function d0e(){let e=getSettingsWithErrors(),n=["user","project","local"].flatMap((r)=>getMcpConfigsByScope(r).errors);return{settings:e.settings,errors:[...e.errors,...n]}}
function RUn(){let e=getSettingsFilePathForSource("localSettings");return[...d0e().errors.filter((n)=>!n.mcpErrorMetadata&&n.severity!=="warning"&&n.file!==e),...getLocalSettingsValidationErrors()]}
var kct=b(()=>{KA();br()});
export {d0e,RUn,kct};
