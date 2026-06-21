// @ts-nocheck
import {HAi,GHt} from "../src/permissions/2218_cli.ts";
import {getSettings_DEPRECATED,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {setMainLoopModelOverride,setInitialMainLoopModel,lt} from "../src/session/0131_sent.ts";
import {Uwe,mg} from "../src/agent/2580_level.ts";
import {Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {b} from "../runtime.ts";
function Ssc(e){let{effectiveModel:t,initialMainLoopModel:n,resolvedInitialModel:r,rawModelRequest:o,restrictedModel:s}=HAi({cli:{model:e.userSpecifiedModel},env:process.env,settings:getSettings_DEPRECATED()||{},agentFrontmatter:e.agentModel!==void 0?{model:e.agentModel}:void 0});return setMainLoopModelOverride(t),setInitialMainLoopModel(n),Uwe("--model",["-m"],n),Ie("startup_resolve_model"),{effectiveModel:t,initialMainLoopModel:n,resolvedInitialModel:r,rawModelRequest:o,restrictedModel:s}}
var bsc=b(()=>{lt();GHt();mg();ln();yr()});
export {Ssc,bsc};
