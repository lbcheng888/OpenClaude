// @ts-nocheck
import {X} from "../runtime.ts";
import {cUr} from "./m2316.ts";
import {uUr} from "./m2317.ts";
import {EIt} from "./m2314.ts";
import {OTn} from "./m2318.ts";
import {PTn} from "./m2315.ts";
import {LTn} from "./m2319.ts";
var dUr=X((Anh,zTi)=>{var qnd=cUr(),jnd=uUr(),Wnd=EIt(),Gnd=OTn(),Vnd=PTn(),Knd=LTn(),znd=(e,t,n,r)=>{switch(t){case"===":if(typeof e==="object")e=e.version;if(typeof n==="object")n=n.version;return e===n;case"!==":if(typeof e==="object")e=e.version;if(typeof n==="object")n=n.version;return e!==n;case"":case"=":case"==":return qnd(e,n,r);case"!=":return jnd(e,n,r);case">":return Wnd(e,n,r);case">=":return Gnd(e,n,r);case"<":return Vnd(e,n,r);case"<=":return Knd(e,n,r);default:throw TypeError(`Invalid operator: ${t}`)}};zTi.exports=znd});
export {dUr};
