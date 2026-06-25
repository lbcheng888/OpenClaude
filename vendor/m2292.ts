// @ts-nocheck
import {zy,xU} from "./m23.ts";
import {rRi,oRi} from "./m2291.ts";
import {b} from "../runtime.ts";
function Edd(e,t,n){var r=!0,o=!0;if(typeof e!="function")throw TypeError(bdd);if(zy(n))r="leading"in n?!!n.leading:r,o="trailing"in n?!!n.trailing:o;return rRi(e,t,{leading:r,maxWait:t,trailing:o})}
var bdd="Expected a function",sRi;
var iRi=b(()=>{oRi();xU();sRi=Edd});
export {Edd,bdd,sRi,iRi};
