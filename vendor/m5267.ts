// @ts-nocheck
import {K9r,V9r,UUe,she} from "./m2272.ts";
import {He,mn} from "../src/telemetry/0600_feature_name.ts";
import {buildMcpToolName,ky} from "../src/agent/2238_explicitlyRequested.ts";
import {b} from "../runtime.ts";
async function LPm(e){let t=[];for(let n of e){let r={plugin:n.name},o=`${n.name}:`;if(n.themesPath)t.push(...await K9r(n.themesPath,r,o));for(let s of n.themesPaths??[])t.push(...await K9r(s,r,o))}return V9r(t),He("plugin_load_themes"),t.sort((n,r)=>n.name.localeCompare(r.name))}
async function MWl(e){if(buildMcpToolName("themes"))return UUe.setState(()=>[]),[];let t=await LPm(e);return UUe.setState(()=>t),t}
var NWl=b(()=>{mn();ky();she()});
export {LPm,MWl,NWl};
