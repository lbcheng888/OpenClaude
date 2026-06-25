// @ts-nocheck
import {getSettingsForSource,getSettingsFilePathForSource,br} from "../src/config/0745_updateSettingsForSource.ts";
import {a2,HRt,wm} from "./m707.ts";
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {vxe,vY} from "./m4097.ts";
import {os} from "../src/api/0465_getOauthConfig.ts";
import {b} from "../runtime.ts";
function jTe(e){switch(e.type){case"command":return e.args?[e.command,...e.args].join(" "):e.command;case"prompt":return e.prompt;case"agent":return e.prompt;case"http":return e.url;case"mcp_tool":return`${e.server}/${e.tool}`;case"callback":return"callback";case"function":return"function"}}
function rU(e){if("statusMessage"in e&&e.statusMessage)return e.statusMessage;return jTe(e)}
function qDl(e){let t=[];if(getSettingsForSource("policySettings")?.allowManagedHooksOnly!==!0){let i=a2,a=new Set;for(let l of i){let c=getSettingsFilePathForSource(l);if(c){let d=$Dl.resolve(c);if(a.has(d))continue;a.add(d)}let u=getSettingsForSource(l);if(!u?.hooks)continue;for(let[d,p]of Object.entries(u.hooks))for(let m of p)for(let f of m.hooks)t.push({event:d,config:f,matcher:m.matcher,source:l})}}let o=getSessionId(),s=vxe(e,o);for(let[i,a]of s.entries())for(let l of a)for(let c of l.hooks)t.push({event:i,config:c,matcher:l.matcher,source:"sessionHook"});return t}
function WDl(e){switch(e){case"userSettings":return"User settings (~/.claude/settings.json)";case"projectSettings":return"Project settings (.claude/settings.json)";case"localSettings":return"Local settings (.claude/settings.local.json)";case"pluginHook":return"Plugin hooks (~/.claude/plugins/*/hooks/hooks.json)";case"sessionHook":return"Session hooks (in-memory, temporary)";case"builtinHook":return"Built-in hooks (registered internally by Claude Code)";default:return e}}
function m0o(e){switch(e){case"userSettings":return"User Settings";case"projectSettings":return"Project Settings";case"localSettings":return"Local Settings";case"pluginHook":return"Plugin Hooks";case"sessionHook":return"Session Hooks";case"builtinHook":return"Built-in Hooks";default:return e}}
function GDl(e){switch(e){case"userSettings":return"User";case"projectSettings":return"Project";case"localSettings":return"Local";case"pluginHook":return"Plugin";case"sessionHook":return"Session";case"builtinHook":return"Built-in";default:return e}}
function VDl(e,t,n){let r=HRt.reduce((o,s,i)=>(o[s]=i,o),{});return[...e].sort((o,s)=>{let i=t[n]?.[o]||[],a=t[n]?.[s]||[],l=os(i.map((m)=>m.source)),c=os(a.map((m)=>m.source)),u=(m)=>m==="pluginHook"||m==="builtinHook"?999:r[m],d=Math.min(...l.map(u)),p=Math.min(...c.map(u));if(d!==p)return d-p;return o.localeCompare(s)})}
var $Dl;
var Cgt=b(()=>{lt();wm();br();vY();$Dl=require("path")});
export {jTe,rU,qDl,WDl,m0o,GDl,VDl,$Dl,Cgt};
