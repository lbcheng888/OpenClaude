// @ts-nocheck
import {getSettingsForSource,getSettingsFilePathForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {F2,nEt,mf} from "./m702.ts";
import {getSessionId,lt} from "../src/session/0131_sent.ts";
import {gIe,x9} from "./m4033.ts";
import {fs} from "../src/api/0459_getOauthConfig.ts";
import {b} from "../runtime.ts";
function Eye(e){switch(e.type){case"command":return e.args?[e.command,...e.args].join(" "):e.command;case"prompt":return e.prompt;case"agent":return e.prompt;case"http":return e.url;case"mcp_tool":return`${e.server}/${e.tool}`;case"callback":return"callback";case"function":return"function"}}
function NU(e){if("statusMessage"in e&&e.statusMessage)return e.statusMessage;return Eye(e)}
function kvl(e){let t=[];if(getSettingsForSource("policySettings")?.allowManagedHooksOnly!==!0){let i=F2,a=new Set;for(let l of i){let c=getSettingsFilePathForSource(l);if(c){let d=xvl.resolve(c);if(a.has(d))continue;a.add(d)}let u=getSettingsForSource(l);if(!u?.hooks)continue;for(let[d,p]of Object.entries(u.hooks))for(let m of p)for(let f of m.hooks)t.push({event:d,config:f,matcher:m.matcher,source:l})}}let o=getSessionId(),s=gIe(e,o);for(let[i,a]of s.entries())for(let l of a)for(let c of l.hooks)t.push({event:i,config:c,matcher:l.matcher,source:"sessionHook"});return t}
function Hvl(e){switch(e){case"userSettings":return"User settings (~/.claude/settings.json)";case"projectSettings":return"Project settings (.claude/settings.json)";case"localSettings":return"Local settings (.claude/settings.local.json)";case"pluginHook":return"Plugin hooks (~/.claude/plugins/*/hooks/hooks.json)";case"sessionHook":return"Session hooks (in-memory, temporary)";case"builtinHook":return"Built-in hooks (registered internally by Claude Code)";default:return e}}
function Jvo(e){switch(e){case"userSettings":return"User Settings";case"projectSettings":return"Project Settings";case"localSettings":return"Local Settings";case"pluginHook":return"Plugin Hooks";case"sessionHook":return"Session Hooks";case"builtinHook":return"Built-in Hooks";default:return e}}
function Ivl(e){switch(e){case"userSettings":return"User";case"projectSettings":return"Project";case"localSettings":return"Local";case"pluginHook":return"Plugin";case"sessionHook":return"Session";case"builtinHook":return"Built-in";default:return e}}
function Dvl(e,t,n){let r=nEt.reduce((o,s,i)=>(o[s]=i,o),{});return[...e].sort((o,s)=>{let i=t[n]?.[o]||[],a=t[n]?.[s]||[],l=fs(i.map((m)=>m.source)),c=fs(a.map((m)=>m.source)),u=(m)=>m==="pluginHook"||m==="builtinHook"?999:r[m],d=Math.min(...l.map(u)),p=Math.min(...c.map(u));if(d!==p)return d-p;return o.localeCompare(s)})}
var xvl;
var uft=b(()=>{lt();mf();yr();x9();xvl=require("path")});
export {Eye,NU,kvl,Hvl,Jvo,Ivl,Dvl,xvl,uft};
