// @ts-nocheck
import {eD,d3,wm} from "./m707.ts";
import {getSettingsForSource,br} from "../src/config/0745_updateSettingsForSource.ts";
import {b} from "../runtime.ts";
function Ovn(){let e=eD();if(!e.includes("userSettings"))return[];let t=getSettingsForSource("userSettings")?.enabledPlugins;if(!t)return[];let n=e.filter((o)=>o!=="userSettings"),r=[];for(let[o,s]of Object.entries(t)){if(s!==!1)continue;let i=null;for(let a of n){let l=getSettingsForSource(a)?.enabledPlugins?.[o];if(l===void 0)continue;i=l===!1?null:a}if(i===null)continue;r.push({pluginId:o,overriddenBy:i})}return r}
function wvd(e){switch(e.overriddenBy){case"projectSettings":return`To opt out, set "enabledPlugins": {"${e.pluginId}": false} in .claude/settings.local.json.`;case"localSettings":return"To opt out, change it to false in .claude/settings.local.json (that file currently enables it).";case"flagSettings":return`This comes from the --settings flag; .claude/settings.local.json won't override it. Remove "${e.pluginId}" from the --settings value.`;case"policySettings":return"Managed policy can't be overridden locally \u2014 contact your "+"administrator.";case"userSettings":return""}}
function E8r(e){let t=d3(e.overriddenBy);return`"${e.pluginId}" is enabled by ${t} settings, which override your user setting. ${wvd(e)}`}
var C8r=b(()=>{wm();br()});
export {Ovn,wvd,E8r,C8r};
