// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {hc,Iy} from "../src/agent/2230_explicitlyRequested.ts";
import {f5,uE,L1} from "./m2232.ts";
import {getMainThreadAgentHooks,getRegisteredHooks,lt} from "../src/session/0131_sent.ts";
import {Bl,sn} from "../src/config/0047_namespace.ts";
import {aZ,m5} from "./m2230.ts";
var wBr={};
isFullscreenWithTTY(wBr,{hasWorktreeCreateHook:()=>hasWorktreeCreateHook});
function hasWorktreeCreateHook(){if(hc("hooks"))return!1;let e=f5()?.WorktreeCreate;if(e&&e.length>0)return!0;if(!uE()){let o=getMainThreadAgentHooks()?.WorktreeCreate;if(o&&o.length>0)return!0}let t=getRegisteredHooks()?.WorktreeCreate;if(!t||t.length===0)return!1;let n=uE(),r=n&&!Bl()?aZ():null;return t.some((o)=>!(n&&("pluginRoot"in o)&&!r?.has(o.pluginId)))}
var IFe=b(()=>{lt();Iy();sn();m5();L1()});
export {wBr,hasWorktreeCreateHook,IFe};
