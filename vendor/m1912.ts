// @ts-nocheck
import {b,M} from "../runtime.ts";
function UCe(e,t,n){let r=(o)=>Object.defineProperty(e,t,{value:o,enumerable:!0,writable:!0});return Object.defineProperty(e,t,{configurable:!0,enumerable:!0,get(){let o=n();return r(o),o},set(o){r(o)}}),e}
async function sPr(){if(CXs.default.platform!=="darwin")throw Error("macOS only");let{stdout:e}=await Qqu("defaults",["read","com.apple.LaunchServices/com.apple.launchservices.secure","LSHandlers"]);return/LSHandlerRoleAll = "(?!-)(?<id>[^"]+?)";\s+?LSHandlerURLScheme = (?:http|https);/.exec(e)?.groups.id??"com.apple.Safari"}
var EXs,CXs,vXs,Qqu;
var wXs=b(()=>{EXs=require("util"),CXs=M(require("process")),vXs=require("child_process"),Qqu=EXs.promisify(vXs.execFile)});
export {UCe,sPr,EXs,CXs,vXs,Qqu,wXs};
