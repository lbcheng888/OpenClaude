// @ts-nocheck
import {b,M} from "../runtime.ts";
import {U4} from "./m2426.ts";
import {ln} from "../src/telemetry/0594_feature_name.ts";
import {qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Lr} from "./m578.ts";
import {Te} from "./m2253.ts";
function nBa(e,t){if(!e||!t)return null;let n=e.kind==="cr"&&!1;return{prefix:"PR",label:`#${e.number}`,url:t,dedupUrl:e.url,color:uCp(e.reviewState)}}
function uCp(e){switch(e){case"approved":return"success";case"changes_requested":return"error";case"pending":return"warning";case"merged":return"merged";default:return}}
function Oao(e,t,n){return}
function rBa(e,t,n){tBa.useEffect(()=>{if(t===void 0)return;Oao(e,t,n==="cr")},[e,t,n])}
var tBa,cCp=!1,Pao="current-pr";
var Lao=b(()=>{U4();ln();qe();Lr();tBa=M(Te(),1)});
export {nBa,uCp,Oao,rBa,tBa,cCp,Pao,Lao};
