// @ts-nocheck
import {UJe,ePr} from "./m1909.ts";
import {b,M} from "../runtime.ts";
var tPr,TXs,SXs,yXs=()=>{if(tPr.default.platform!=="linux")return!1;if(TXs.default.release().toLowerCase().includes("microsoft")){if(UJe())return!1;return!0}try{return SXs.default.readFileSync("/proc/version","utf8").toLowerCase().includes("microsoft")?!UJe():!1}catch{return!1}},FCe;
var nPr=b(()=>{ePr();tPr=M(require("process")),TXs=M(require("os")),SXs=M(require("fs")),FCe=tPr.default.env.__IS_WSL_TEST__?yXs:yXs()});
export {tPr,TXs,SXs,yXs,FCe,nPr};
