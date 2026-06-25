// @ts-nocheck
import {b} from "../runtime.ts";
var WXe=(e,t={})=>{Object.entries(t).filter(([,r])=>r!==void 0).forEach(([r,o])=>{if(e[r]==null||e[r]==="")e[r]=o});let n=e.message||e.Message||"UnknownError";return e.message=n,delete e.Message,e};
var uPr=()=>{};
var mzs=b(()=>{uPr()});
export {WXe,uPr,mzs};
