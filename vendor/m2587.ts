// @ts-nocheck
import {b} from "../runtime.ts";
function cDt(e){return D0i.createHash("sha256").update(e+nhd).digest("hex").slice(0,16)}
var D0i,nhd="claude-plugin-telemetry-v1";
var K3r=b(()=>{D0i=require("crypto")});
export {cDt,D0i,nhd,K3r};
