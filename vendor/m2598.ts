// @ts-nocheck
import {b} from "../runtime.ts";
function UOt(e){return uNi.createHash("sha256").update(e+kvd).digest("hex").slice(0,16)}
var uNi,kvd="claude-plugin-telemetry-v1";
var A8r=b(()=>{uNi=require("crypto")});
export {UOt,uNi,kvd,A8r};
