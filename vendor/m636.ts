// @ts-nocheck
import {Trs,Srs} from "./m634.ts";
import {brs,Ers} from "./m635.ts";
import {b} from "../runtime.ts";
function vou(e){return Trs(function(t,n){var r=-1,o=n.length,s=o>1?n[o-1]:void 0,i=o>2?n[2]:void 0;if(s=e.length>3&&typeof s=="function"?(o--,s):void 0,i&&brs(n[0],n[1],i))s=o<3?void 0:s,o=1;t=Object(t);while(++r<o){var a=n[r];if(a)e(t,a,r,s)}return t})}
var Crs;
var Ars=b(()=>{Srs();Ers();Crs=vou});
export {vou,Crs,Ars};
