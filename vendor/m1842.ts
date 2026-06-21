// @ts-nocheck
import {X} from "../runtime.ts";
import {_Dr} from "./m1838.ts";
import {yDr} from "./m1839.ts";
import {wxt} from "./m1836.ts";
import {Sfn} from "./m1840.ts";
import {Tfn} from "./m1837.ts";
import {bfn} from "./m1841.ts";
var TDr=X((WNA,Wzs)=>{var f$u=_Dr(),A$u=yDr(),h$u=wxt(),g$u=Sfn(),_$u=Tfn(),y$u=bfn(),T$u=(e,t,n,r)=>{switch(t){case"===":if(typeof e==="object")e=e.version;if(typeof n==="object")n=n.version;return e===n;case"!==":if(typeof e==="object")e=e.version;if(typeof n==="object")n=n.version;return e!==n;case"":case"=":case"==":return f$u(e,n,r);case"!=":return A$u(e,n,r);case">":return h$u(e,n,r);case">=":return g$u(e,n,r);case"<":return _$u(e,n,r);case"<=":return y$u(e,n,r);default:throw TypeError(`Invalid operator: ${t}`)}};Wzs.exports=T$u});
export {TDr};
