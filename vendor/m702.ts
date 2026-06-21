// @ts-nocheck
import {getAllowedSettingSources,lt} from "../src/session/0131_sent.ts";
import {b} from "../runtime.ts";
function A7(e){switch(e){case"userSettings":return"user";case"projectSettings":return"project";case"localSettings":return"project, gitignored";case"flagSettings":return"cli flag";case"policySettings":return"managed"}}
function z7e(e){switch(e){case"userSettings":return"User";case"projectSettings":return"Project";case"localSettings":return"Local";case"flagSettings":return"Flag";case"policySettings":return"Managed";case"plugin":return"Plugin";case"built-in":return"Built-in";case"mcp":return"MCP"}}
function its(e){switch(e){case"userSettings":return"user settings";case"projectSettings":return"shared project settings";case"localSettings":return"project local settings";case"flagSettings":return"command line arguments";case"policySettings":return"enterprise managed settings";case"cliArg":return"CLI argument";case"command":return"command configuration";case"session":return"current session";case"toolsNarrowing":return"CLI tool narrowing";case"mcpServerPolicy":return"MCP server policy"}}
function ats(e){switch(e){case"userSettings":return"User settings";case"projectSettings":return"Shared project settings";case"localSettings":return"Project local settings";case"flagSettings":return"Command line arguments";case"policySettings":return"Enterprise managed settings";case"cliArg":return"CLI argument";case"command":return"Command configuration";case"session":return"Current session";case"toolsNarrowing":return"CLI tool narrowing";case"mcpServerPolicy":return"MCP server policy"}}
function lts(e){if(e==="")return[];let t=e.split(",").map((r)=>r.trim()),n=[];for(let r of t)switch(r){case"user":n.push("userSettings");break;case"project":n.push("projectSettings");break;case"local":n.push("localSettings");break;default:throw Error(`Invalid setting source: ${r}. Valid options are: user, project, local`)}return n}
function $D(){let e=getAllowedSettingSources();if(IAr?.allowed===e)return IAr.result;let t=new Set(e);t.add("flagSettings"),t.add("policySettings");let n=Tw.filter((r)=>t.has(r));return IAr={allowed:e,result:n},n}
function xh(e){return $D().includes(e)}
var Tw,IAr,F2,nEt;
var mf=b(()=>{lt();Tw=["userSettings","projectSettings","localSettings","flagSettings","policySettings"];F2=["userSettings","projectSettings","localSettings"],nEt=["localSettings","projectSettings","userSettings"]});
export {A7,z7e,its,ats,lts,$D,xh,Tw,IAr,F2,nEt,mf};
