// @ts-nocheck
import {getAllowedSettingSources,lt} from "../src/session/0132_sent.ts";
import {b} from "../runtime.ts";
function d3(e){switch(e){case"userSettings":return"user";case"projectSettings":return"project";case"localSettings":return"project, gitignored";case"flagSettings":return"cli flag";case"policySettings":return"managed"}}
function Kje(e){switch(e){case"userSettings":return"User";case"projectSettings":return"Project";case"localSettings":return"Local";case"flagSettings":return"Flag";case"policySettings":return"Managed";case"plugin":return"Plugin";case"built-in":return"Built-in";case"mcp":return"MCP"}}
function nas(e){switch(e){case"userSettings":return"user settings";case"projectSettings":return"shared project settings";case"localSettings":return"project local settings";case"flagSettings":return"command line arguments";case"policySettings":return"enterprise managed settings";case"cliArg":return"CLI argument";case"command":return"command configuration";case"session":return"current session";case"toolsNarrowing":return"CLI tool narrowing";case"mcpServerPolicy":return"MCP server policy"}}
function ras(e){switch(e){case"userSettings":return"User settings";case"projectSettings":return"Shared project settings";case"localSettings":return"Project local settings";case"flagSettings":return"Command line arguments";case"policySettings":return"Enterprise managed settings";case"cliArg":return"CLI argument";case"command":return"Command configuration";case"session":return"Current session";case"toolsNarrowing":return"CLI tool narrowing";case"mcpServerPolicy":return"MCP server policy"}}
function oas(e){if(e==="")return[];let t=e.split(",").map((r)=>r.trim()),n=[];for(let r of t)switch(r){case"user":n.push("userSettings");break;case"project":n.push("projectSettings");break;case"local":n.push("localSettings");break;default:throw Error(`Invalid setting source: ${r}. Valid options are: user, project, local`)}return n}
function eD(){let e=getAllowedSettingSources();if(iSr?.allowed===e)return iSr.result;let t=new Set(e);t.add("flagSettings"),t.add("policySettings");let n=fA.filter((r)=>t.has(r));return iSr={allowed:e,result:n},n}
function xh(e){return eD().includes(e)}
var fA,iSr,a2,HRt;
var wm=b(()=>{lt();fA=["userSettings","projectSettings","localSettings","flagSettings","policySettings"];a2=["userSettings","projectSettings","localSettings"],HRt=["localSettings","projectSettings","userSettings"]});
export {d3,Kje,nas,ras,oas,eD,xh,fA,iSr,a2,HRt,wm};
