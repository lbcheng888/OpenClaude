// @ts-nocheck
import {b,x} from "../runtime.ts";
function CRe(e,t,n){let r=(o)=>Object.defineProperty(e,t,{value:o,enumerable:!0,writable:!0});return Object.defineProperty(e,t,{configurable:!0,enumerable:!0,get(){let o=n();return r(o),o},set(o){r(o)}}),e}
async function L1r(){if(Tri.default.platform!=="darwin")throw Error("macOS only");let{stdout:e}=await _Yu("defaults",["read","com.apple.LaunchServices/com.apple.launchservices.secure","LSHandlers"]);return/LSHandlerRoleAll = "(?!-)(?<id>[^"]+?)";\s+?LSHandlerURLScheme = (?:http|https);/.exec(e)?.groups.id??"com.apple.Safari"}
var yri,Tri,Sri,_Yu;
var bri=b(()=>{yri=require("util"),Tri=x(require("process")),Sri=require("child_process"),_Yu=yri.promisify(Sri.execFile)});
export {CRe,L1r,yri,Tri,Sri,_Yu,bri};
