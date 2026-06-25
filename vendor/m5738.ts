// @ts-nocheck
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {b} from "../runtime.ts";
function kYm(e){return e.replace(wYm,(t)=>t==="\u2028"?"\\u2028":"\\u2029")}
function TVe(e){return kYm(TeamDeleteToolName(e))}
var wYm;
var K$o=b(()=>{tn();wYm=/\u2028|\u2029/g});
export {kYm,TVe,wYm,K$o};
