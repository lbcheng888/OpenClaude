// @ts-nocheck
import {Q} from "../runtime.ts";
import {U3r} from "./m2326.ts";
import {$3r} from "./m2327.ts";
import {XDt} from "./m2324.ts";
import {SCn} from "./m2328.ts";
import {TCn} from "./m2325.ts";
import {bCn} from "./m2329.ts";
var q3r=Q((Yfg,nwi)=>{var hmd=U3r(),gmd=$3r(),_md=XDt(),ymd=SCn(),Tmd=TCn(),Smd=bCn(),bmd=(e,t,n,r)=>{switch(t){case"===":if(typeof e==="object")e=e.version;if(typeof n==="object")n=n.version;return e===n;case"!==":if(typeof e==="object")e=e.version;if(typeof n==="object")n=n.version;return e!==n;case"":case"=":case"==":return hmd(e,n,r);case"!=":return gmd(e,n,r);case">":return _md(e,n,r);case">=":return ymd(e,n,r);case"<":return Tmd(e,n,r);case"<=":return Smd(e,n,r);default:throw TypeError(`Invalid operator: ${t}`)}};nwi.exports=bmd});
export {q3r};
