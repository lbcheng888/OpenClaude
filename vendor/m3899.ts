// @ts-nocheck
import {getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {getCanonicalName,Mo} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {b} from "../runtime.ts";
function FFn(e){let t=getGlobalConfig().clientDataCache?.cedar_lagoon;if(typeof t!=="object"||t===null)return!1;let n=getCanonicalName(e);return Object.entries(t).some(([r,o])=>o===!0&&n.includes(r))}
var Uso=b(()=>{Qn();Mo()});
export {FFn,Uso};
