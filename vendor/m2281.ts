// @ts-nocheck
import {tT,c2} from "./m13.ts";
import {z_i,Y_i} from "./m2280.ts";
import {b} from "../runtime.ts";
function Yed(e,t,n){var r=!0,o=!0;if(typeof e!="function")throw TypeError(zed);if(tT(n))r="leading"in n?!!n.leading:r,o="trailing"in n?!!n.trailing:o;return z_i(e,t,{leading:r,maxWait:t,trailing:o})}
var zed="Expected a function",J_i;
var X_i=b(()=>{Y_i();c2();J_i=Yed});
export {Yed,zed,J_i,X_i};
