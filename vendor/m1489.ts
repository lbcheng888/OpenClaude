// @ts-nocheck
import {Ne} from "./m583.ts";
import {getFoundryDeploymentCapabilities,lt} from "../src/session/0132_sent.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {getAPIProvider,Ps} from "../src/api/1287_usesFirstPartyModelIds.ts";
import {Uo} from "./m137.ts";
import {b} from "../runtime.ts";
import {jx} from "./m196.ts";
import {Ir} from "./m584.ts";
function rDr(){return Ne.ANTHROPIC_FOUNDRY_BASE_URL||(Ne.ANTHROPIC_FOUNDRY_RESOURCE?`https://${Ne.ANTHROPIC_FOUNDRY_RESOURCE}.services.ai.azure.com`:void 0)}
function oDr(e){let t=e.replace(/\[(1|2)m\]/gi,"");return`${rDr()??"unknown-foundry-resource"}::${t}`}
function X8s(e){let t=e.match(O3u)?.[1];if(t){let r=t.split(",").map((o)=>o.trim());if(r.every((o)=>J8s.test(o)))return r}let n=e.match(L3u)?.[1];if(n){let r=n.split(/[,\s]+/).filter((o)=>o!=="and"&&J8s.test(o));return r.length>0?r:null}if(M3u.test(e))return["web_search"];return null}
function sDr(e,t){if(t.length===0)return;let n=oDr(e),r=getFoundryDeploymentCapabilities(),o=r.get(n);if(o&&t.every((i)=>o.has(i)))return;let s=o?new Set(o):new Set;for(let i of t)s.add(i);r.set(n,s),logForDebugging(`[foundry-capabilities] deployment ${n} does not support: ${[...s].join(", ")}`,{level:"warn"})}
function tse(e,t){let n=getFoundryDeploymentCapabilities();if(n.size===0)return!0;return!n.get(oDr(e))?.has(t)}
function iDr(e){if(getAPIProvider()!=="foundry")return null;if(!(e instanceof Uo)||e.status!==400)return null;let t=e.error;if(t&&typeof t==="object"&&"error"in t){let n=t.error;if(n&&typeof n==="object"&&"message"in n&&typeof n.message==="string")return X8s(n.message)}return X8s(e.message??"")}
function afn(e,t,n){let r=iDr(e);if(!r)return null;if(sDr(t,r),n==="web_search_tool")return nHt;if(r.some((o)=>N3u.has(o)))return`retry:foundry-capability-strip:${r.join(",")}`;return null}
function Q8s(e,t){if(getAPIProvider()!=="foundry")return e;let n=getFoundryDeploymentCapabilities();if(n.size===0)return e;let r=n.get(oDr(t));if(!r||r.size===0)return e;let o=r.has("tool_search_server")||r.has("tool_search"),s=r.has("structured_outputs");if(!o&&!s)return e;let i=!1,a=e.map((l)=>{let c=o&&l.defer_loading,u=s&&l.strict;if(!c&&!u)return l;i=!0;let d={...l};if(c)delete d.defer_loading;if(u)delete d.strict;return d});return i?a:e}
var O3u,L3u,M3u,J8s,N3u,nHt="fail:foundry-purpose-request";
var OXe=b(()=>{jx();lt();qe();Ir();Ps();O3u=/([a-z0-9_, ]+?)\s+not supported in your workspace/i,L3u=/features are not available for Azure AI Foundry workspaces?:\s*([a-z0-9_, ]+)/i,M3u=/server-side web search is not available in this environment/i;J8s=/^[a-z][a-z0-9_]*$/;N3u=new Set(["tool_search_server","tool_search","structured_outputs"])});
export {rDr,oDr,X8s,sDr,tse,iDr,afn,Q8s,O3u,L3u,M3u,J8s,N3u,nHt,OXe};
