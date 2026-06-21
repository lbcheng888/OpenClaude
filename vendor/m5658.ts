// @ts-nocheck
import {Bl,sn} from "../src/config/0047_namespace.ts";
import {doesEnterpriseMcpConfigExist,filterMcpServersByPolicy,px} from "../src/telemetry/3148_unwrapCcrProxyUrl.ts";
import {agentMcpSpecsToScopedConfigs,scrubPathsConfig} from "../src/permissions/4454_toAgentInfos.ts";
import {b} from "../runtime.ts";
function Eht(e,t,n){if(!t)return e;if(Bl())return e;if(n?.strictMcpConfig&&t.source!=="flagSettings"||doesEnterpriseMcpConfigExist())return e;let o=agentMcpSpecsToScopedConfigs(t);if(Object.keys(o).length===0)return e;let{allowed:s,blocked:i}=filterMcpServersByPolicy(o);if(i.length>0)n?.onBlocked?.(i);return{...s,...e}}
var L1o=b(()=>{px();scrubPathsConfig();sn()});
export {Eht,L1o};
