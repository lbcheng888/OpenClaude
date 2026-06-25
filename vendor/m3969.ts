// @ts-nocheck
import {getCachedClientData,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {getCanonicalName,Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {b} from "../runtime.ts";
function Edo(e){f$a=e}
function h$a(){return f$a}
var f$a;
function h9n(e){let t=getCachedClientData()?.cedar_lagoon;if(typeof t!=="object"||t===null)return!1;let n=getCanonicalName(e);return Object.entries(t).some(([r,o])=>o===!0&&n.includes(r))}
var Cdo=b(()=>{tr();Ro()});
export {Edo,h$a,f$a,h9n,Cdo};
