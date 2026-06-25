// @ts-nocheck
import {Oh,VS} from "./m1636.ts";
import {yFe,Yzs,sse} from "./m1629.ts";
import {b} from "../runtime.ts";
import {Tjs} from "./m1638.ts";
function I0(e,t){if(!t.match(/^[0-9a-zA-Z-.]+$/)){let n=Error("Invalid tenant id provided. You can locate your tenant id by following the instructions listed here: https://learn.microsoft.com/partner-center/find-ids-and-domain-names.");throw e.info(Oh("",n)),n}}
function JXe(e,t,n){if(t)return I0(e,t),t;if(!n)n=yFe;if(n!==yFe)return"common";return"organizations"}
function PR(e){if(!e||e.length===0)return[];if(e.includes("*"))return Yzs;return e}
var uD=b(()=>{sse();VS();Tjs()});
export {I0,JXe,PR,uD};
