// @ts-nocheck
import {je} from "./m577.ts";
import {getFoundryDeploymentCapabilities,lt} from "../src/session/0131_sent.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {getAPIProvider,li} from "../src/api/1282_usesFirstPartyModelIds.ts";
import {es} from "./m135.ts";
import {b} from "../runtime.ts";
import {LD} from "./m194.ts";
import {Lr} from "./m578.ts";
function Rxr(){return je.ANTHROPIC_FOUNDRY_BASE_URL||(je.ANTHROPIC_FOUNDRY_RESOURCE?`https://${je.ANTHROPIC_FOUNDRY_RESOURCE}.services.ai.azure.com`:void 0)}
function xxr(e){let t=e.replace(/\[(1|2)m\]/gi,"");return`${Rxr()??"unknown-foundry-resource"}::${t}`}
function n3s(e){let t=e.match(ALu)?.[1];if(t){let r=t.split(",").map((o)=>o.trim());if(r.every((o)=>t3s.test(o)))return r}let n=e.match(hLu)?.[1];if(n){let r=n.split(/[,\s]+/).filter((o)=>o!=="and"&&t3s.test(o));return r.length>0?r:null}if(gLu.test(e))return["web_search"];return null}
function kxr(e,t){if(t.length===0)return;let n=xxr(e),r=getFoundryDeploymentCapabilities(),o=r.get(n);if(o&&t.every((i)=>o.has(i)))return;let s=o?new Set(o):new Set;for(let i of t)s.add(i);r.set(n,s),logForDebugging(`[foundry-capabilities] deployment ${n} does not support: ${[...s].join(", ")}`,{level:"warn"})}
function nse(e,t){let n=getFoundryDeploymentCapabilities();if(n.size===0)return!0;return!n.get(xxr(e))?.has(t)}
function Hxr(e){if(getAPIProvider()!=="foundry")return null;if(!(e instanceof es)||e.status!==400)return null;let t=e.error;if(t&&typeof t==="object"&&"error"in t){let n=t.error;if(n&&typeof n==="object"&&"message"in n&&typeof n.message==="string")return n3s(n.message)}return n3s(e.message??"")}
function vdn(e,t,n){let r=Hxr(e);if(!r)return null;if(kxr(t,r),n==="web_search_tool")return kwt;if(r.some((o)=>_Lu.has(o)))return`retry:foundry-capability-strip:${r.join(",")}`;return null}
function r3s(e,t){if(getAPIProvider()!=="foundry")return e;let n=getFoundryDeploymentCapabilities();if(n.size===0)return e;let r=n.get(xxr(t));if(!r||r.size===0)return e;let o=r.has("tool_search_server")||r.has("tool_search"),s=r.has("structured_outputs");if(!o&&!s)return e;let i=!1,a=e.map((l)=>{let c=o&&l.defer_loading,u=s&&l.strict;if(!c&&!u)return l;i=!0;let d={...l};if(c)delete d.defer_loading;if(u)delete d.strict;return d});return i?a:e}
var ALu,hLu,gLu,t3s,_Lu,kwt="fail:foundry-purpose-request";
var MYe=b(()=>{LD();lt();qe();Lr();li();ALu=/([a-z0-9_, ]+?)\s+not supported in your workspace/i,hLu=/features are not available for Azure AI Foundry workspaces?:\s*([a-z0-9_, ]+)/i,gLu=/server-side web search is not available in this environment/i;t3s=/^[a-z][a-z0-9_]*$/;_Lu=new Set(["tool_search_server","tool_search","structured_outputs"])});
export {Rxr,xxr,n3s,kxr,nse,Hxr,vdn,r3s,ALu,hLu,gLu,t3s,_Lu,kwt,MYe};
