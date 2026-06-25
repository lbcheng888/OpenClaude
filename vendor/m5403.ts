// @ts-nocheck
import {useClock} from "./m2442.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
function UYl(e){let[t,n]=$er.useState(!1),r=useClock();return $er.useEffect(()=>{if(BYl||!e)return;BYl=!0,n(!0);let o=r.setTimeout(()=>n(!1),tUm);return()=>{o(),n(!1)}},[e,r]),t}
var $er,tUm=5000,BYl=!1;
var $Yl=b(()=>{je();$er=x(et(),1)});
export {UYl,$er,tUm,BYl,$Yl};
