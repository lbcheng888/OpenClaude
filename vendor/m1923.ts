// @ts-nocheck
import {Hh,GS} from "./m1631.ts";
import {b} from "../runtime.ts";
function K8(e){return Array.isArray(e)?e:[e]}
function qJe(e,t){if(!e.match(/^[0-9a-zA-Z-_.:/]+$/)){let n=Error("Invalid scope was specified by the user or calling client");throw t.getToken.info(Hh(e,n)),n}}
function Kfn(e){return e.replace(/\/.default$/,"")}
var bse=b(()=>{GS()});
export {K8,qJe,Kfn,bse};
