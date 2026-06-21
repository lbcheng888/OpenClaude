// @ts-nocheck
import {useClock} from "./m2432.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function r8l(e){let[t,n]=$Jn.useState(!1),r=useClock();return $Jn.useEffect(()=>{if(n8l||!e)return;n8l=!0,n(!0);let o=r.setTimeout(()=>n(!1),K0m);return()=>{o(),n(!1)}},[e,r]),t}
var $Jn,K0m=5000,n8l=!1;
var o8l=b(()=>{ze();$Jn=M(Te(),1)});
export {r8l,$Jn,K0m,n8l,o8l};
