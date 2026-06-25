// @ts-nocheck
import {Ibi,TDt} from "../src/permissions/2226_cli.ts";
import {getSettings_DEPRECATED,br} from "../src/config/0745_updateSettingsForSource.ts";
import {setMainLoopModelOverride,setInitialMainLoopModel,lt} from "../src/session/0132_sent.ts";
import {Cwe,Pf} from "../src/agent/2591_level.ts";
import {He,mn} from "../src/telemetry/0600_feature_name.ts";
import {b} from "../runtime.ts";
function ufc(e){let{effectiveModel:t,initialMainLoopModel:n,resolvedInitialModel:r,rawModelRequest:o,restrictedModel:s}=Ibi({cli:{model:e.userSpecifiedModel},env:process.env,settings:getSettings_DEPRECATED()||{},agentFrontmatter:e.agentModel!==void 0?{model:e.agentModel}:void 0});return setMainLoopModelOverride(t),setInitialMainLoopModel(n),Cwe("--model",["-m"],n),He("startup_resolve_model"),{effectiveModel:t,initialMainLoopModel:n,resolvedInitialModel:r,rawModelRequest:o,restrictedModel:s}}
var dfc=b(()=>{lt();TDt();Pf();mn();br()});
export {ufc,dfc};
