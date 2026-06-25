// @ts-nocheck
import {Q} from "../runtime.ts";
import {mPi} from "./m2495.ts";
import {hPi} from "./m2496.ts";
import {_Pi} from "./m2497.ts";
import {N6r} from "./m2493.ts";
import {TPi} from "./m2498.ts";
import {bPi} from "./m2499.ts";
var CPi=Q((XRg,EPi)=>{var NSd=mPi(),FSd=hPi(),BSd=_Pi(),USd=N6r(),$Sd=TPi(),qSd=bPi(),WSd=(e,t,n,r)=>{switch(t){case"===":if(typeof e==="object")e=e.version;if(typeof n==="object")n=n.version;return e===n;case"!==":if(typeof e==="object")e=e.version;if(typeof n==="object")n=n.version;return e!==n;case"":case"=":case"==":return NSd(e,n,r);case"!=":return FSd(e,n,r);case">":return BSd(e,n,r);case">=":return USd(e,n,r);case"<":return $Sd(e,n,r);case"<=":return qSd(e,n,r);default:throw TypeError(`Invalid operator: ${t}`)}};EPi.exports=WSd});
export {CPi};
