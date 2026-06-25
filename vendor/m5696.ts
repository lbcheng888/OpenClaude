// @ts-nocheck
import {dl,dn} from "../src/config/0137_namespace.ts";
import {doesEnterpriseMcpConfigExist,filterMcpServersByPolicy,KA} from "../src/telemetry/3158_unwrapCcrProxyUrl.ts";
import {agentMcpSpecsToScopedConfigs,kg} from "../src/permissions/4476_toAgentInfos.ts";
import {b} from "../runtime.ts";
function Kyt(e,t,n){if(!t)return e;if(dl())return e;if(n?.strictMcpConfig&&t.source!=="flagSettings"||doesEnterpriseMcpConfigExist())return e;let o=agentMcpSpecsToScopedConfigs(t);if(Object.keys(o).length===0)return e;let{allowed:s,blocked:i}=filterMcpServersByPolicy(o);if(i.length>0)n?.onBlocked?.(i);return{...s,...e}}
var a$o=b(()=>{KA();kg();dn()});
export {Kyt,a$o};
