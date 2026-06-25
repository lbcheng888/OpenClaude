// @ts-nocheck
import {FQe,I1r} from "./m1914.ts";
import {b,x} from "../runtime.ts";
var x1r,hri,gri,fri=()=>{if(x1r.default.platform!=="linux")return!1;if(hri.default.release().toLowerCase().includes("microsoft")){if(FQe())return!1;return!0}try{return gri.default.readFileSync("/proc/version","utf8").toLowerCase().includes("microsoft")?!FQe():!1}catch{return!1}},ERe;
var D1r=b(()=>{I1r();x1r=x(require("process")),hri=x(require("os")),gri=x(require("fs")),ERe=x1r.default.env.__IS_WSL_TEST__?fri:fri()});
export {x1r,hri,gri,fri,ERe,D1r};
