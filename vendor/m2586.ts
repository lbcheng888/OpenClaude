// @ts-nocheck
import {$D,A7,mf} from "./m702.ts";
import {getSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {b} from "../runtime.ts";
function WEn(){let e=$D();if(!e.includes("userSettings"))return[];let t=getSettingsForSource("userSettings")?.enabledPlugins;if(!t)return[];let n=e.filter((o)=>o!=="userSettings"),r=[];for(let[o,s]of Object.entries(t)){if(s!==!1)continue;let i=null;for(let a of n){let l=getSettingsForSource(a)?.enabledPlugins?.[o];if(l===void 0)continue;i=l===!1?null:a}if(i===null)continue;r.push({pluginId:o,overriddenBy:i})}return r}
function thd(e){switch(e.overriddenBy){case"projectSettings":return`To opt out, set "enabledPlugins": {"${e.pluginId}": false} in .claude/settings.local.json.`;case"localSettings":return"To opt out, change it to false in .claude/settings.local.json (that file currently enables it).";case"flagSettings":return`This comes from the --settings flag; .claude/settings.local.json won't override it. Remove "${e.pluginId}" from the --settings value.`;case"policySettings":return"Managed policy can't be overridden locally \u2014 contact your "+"administrator.";case"userSettings":return""}}
function G3r(e){let t=A7(e.overriddenBy);return`"${e.pluginId}" is enabled by ${t} settings, which override your user setting. ${thd(e)}`}
var V3r=b(()=>{mf();yr()});
export {WEn,thd,G3r,V3r};
