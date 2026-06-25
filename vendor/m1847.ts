// @ts-nocheck
import {Q} from "../runtime.ts";
import {jMr} from "./m1843.ts";
import {YMr} from "./m1844.ts";
import {ZIt} from "./m1841.ts";
import {r_n} from "./m1845.ts";
import {n_n} from "./m1842.ts";
import {o_n} from "./m1846.ts";
var JMr=Q((pWh,Bei)=>{var PVu=jMr(),OVu=YMr(),LVu=ZIt(),MVu=r_n(),NVu=n_n(),FVu=o_n(),BVu=(e,t,n,r)=>{switch(t){case"===":if(typeof e==="object")e=e.version;if(typeof n==="object")n=n.version;return e===n;case"!==":if(typeof e==="object")e=e.version;if(typeof n==="object")n=n.version;return e!==n;case"":case"=":case"==":return PVu(e,n,r);case"!=":return OVu(e,n,r);case">":return LVu(e,n,r);case">=":return MVu(e,n,r);case"<":return NVu(e,n,r);case"<=":return FVu(e,n,r);default:throw TypeError(`Invalid operator: ${t}`)}};Bei.exports=BVu});
export {JMr};
