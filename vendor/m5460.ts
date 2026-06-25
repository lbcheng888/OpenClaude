// @ts-nocheck
import {aS,uee} from "./m2762.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function ozt(e,t){if(e&&t&&t.length>0)return aS([...e,...t],"name");return e||[]}
function kQl(e,t){return wQl.useMemo(()=>ozt(e,t),[e,t])}
var wQl;
var HQl=b(()=>{uee();wQl=x(et(),1)});
export {ozt,kQl,wQl,HQl};
