// @ts-nocheck
import {Vs,lT} from "./m2195.ts";
import {withOAuth401Retry,kk} from "../src/api/2037_withOAuth401Retry.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {He,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {Ce,Ct} from "./m197.ts";
import {getGlobalConfig,saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {isClaudeAISubscriber,Vv,lo} from "../src/config/2036_withOAuthRefreshLock.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {b} from "../runtime.ts";
import {v5,L1e} from "./m643.ts";
async function Mrp(){let e=await Vs.get("/api/claude_code/organizations/metrics_enabled",{auth:"async",timeout:5000,bypassEssentialTrafficOnly:!0});if(!e.ok)throw Error(e.reason==="no-auth"?`Auth error: ${e.detail}`:`metrics_enabled unavailable: ${e.reason}`);return e.data}
async function Nrp(){try{let e=await withOAuth401Retry(Mrp,{also403Revoked:!0});return logForDebugging(`Metrics opt-out API response: enabled=${e.metrics_logging_enabled}`),He("api_metrics_opt_out_check"),{enabled:e.metrics_logging_enabled,hasError:!1}}catch(e){return logForDebugging(`Failed to check metrics opt-out status: ${Ce(e)}`,{level:"error"}),xe("api_metrics_opt_out_check","request_failed"),{enabled:!1,hasError:!0}}}
async function mSa(){let e=await Frp();if(e.hasError)return e;let t=getGlobalConfig().metricsStatusCache;if(t!==void 0&&t.enabled===e.enabled&&Date.now()-t.timestamp<fSa)return e;return saveGlobalConfig((r)=>({...r,metricsStatusCache:{enabled:e.enabled,timestamp:Date.now()}})),e}
async function hSa(){if(isClaudeAISubscriber()&&!Vv())return{enabled:!1,hasError:!1};let e=getGlobalConfig().metricsStatusCache;if(e){if(Date.now()-e.timestamp>fSa)mSa().catch(Ie);return{enabled:e.enabled,hasError:!1}}return mSa()}
var Lrp=3600000,fSa=86400000,Frp;
var gSa=b(()=>{lo();tr();qe();Ct();kk();vn();v5();mn();lT();Frp=L1e(Nrp,Lrp)});
export {Mrp,Nrp,mSa,hSa,Lrp,fSa,Frp,gSa};
