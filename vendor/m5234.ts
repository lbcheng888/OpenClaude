// @ts-nocheck
import {AFr,fFr,qFe,zfe} from "./m2263.ts";
import {Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {hc,Iy} from "../src/agent/2230_explicitlyRequested.ts";
import {b} from "../runtime.ts";
async function bvm(e){let t=[];for(let n of e){let r={plugin:n.name},o=`${n.name}:`;if(n.themesPath)t.push(...await AFr(n.themesPath,r,o));for(let s of n.themesPaths??[])t.push(...await AFr(s,r,o))}return fFr(t),Ie("plugin_load_themes"),t.sort((n,r)=>n.name.localeCompare(r.name))}
async function V2l(e){if(hc("themes"))return qFe.setState(()=>[]),[];let t=await bvm(e);return qFe.setState(()=>t),t}
var K2l=b(()=>{ln();Iy();zfe()});
export {bvm,V2l,K2l};
