// @ts-nocheck
import {b,x} from "../runtime.ts";
import {a4} from "./m2436.ts";
import {mn} from "../src/telemetry/0600_feature_name.ts";
import {qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ir} from "./m584.ts";
import {et} from "./m2261.ts";
function kqa(e,t){if(!e||!t)return null;let n=e.kind==="cr"&&!1;return{prefix:"PR",label:`#${e.number}`,url:t,dedupUrl:e.url,color:oPp(e.reviewState)}}
function oPp(e){switch(e){case"approved":return"success";case"changes_requested":return"error";case"pending":return"warning";case"merged":return"merged";default:return}}
function Tmo(e,t,n){return}
function Hqa(e,t,n){wqa.useEffect(()=>{if(t===void 0)return;Tmo(e,t,n==="cr")},[e,t,n])}
var wqa,rPp=!1,ymo="current-pr";
var Smo=b(()=>{a4();mn();qe();Ir();wqa=x(et(),1)});
export {kqa,oPp,Tmo,Hqa,wqa,rPp,ymo,Smo};
