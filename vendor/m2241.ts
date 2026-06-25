// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {buildMcpToolName,ky} from "../src/agent/2238_explicitlyRequested.ts";
import {Y3,eS,zM} from "./m2240.ts";
import {getMainThreadAgentHooks,getRegisteredHooks,lt} from "../src/session/0132_sent.ts";
import {dl,dn} from "../src/config/0137_namespace.ts";
import {Z7,k8} from "./m2238.ts";
var o9r={};
ft(o9r,{hasWorktreeRemoveHook:()=>hasWorktreeRemoveHook,hasWorktreeCreateHook:()=>hasWorktreeCreateHook});
function hasWorktreeCreateHook(){if(buildMcpToolName("hooks"))return!1;let e=Y3()?.WorktreeCreate;if(e&&e.length>0)return!0;if(!eS()){let o=getMainThreadAgentHooks()?.WorktreeCreate;if(o&&o.length>0)return!0}let t=getRegisteredHooks()?.WorktreeCreate;if(!t||t.length===0)return!1;let n=eS(),r=n&&!dl()?Z7():null;return t.some((o)=>!(n&&("pluginRoot"in o)&&!r?.has(o.pluginId)))}
function hasWorktreeRemoveHook(){if(buildMcpToolName("hooks"))return!1;let e=Y3()?.WorktreeRemove;if(e&&e.length>0)return!0;if(!eS()){let o=getMainThreadAgentHooks()?.WorktreeRemove;if(o&&o.length>0)return!0}let t=getRegisteredHooks()?.WorktreeRemove;if(!t||t.length===0)return!1;let n=eS(),r=n&&!dl()?Z7():null;return t.some((o)=>!(n&&("pluginRoot"in o)&&!r?.has(o.pluginId)))}
var kUe=b(()=>{lt();ky();dn();k8();zM()});
export {o9r,hasWorktreeCreateHook,hasWorktreeRemoveHook,kUe};
