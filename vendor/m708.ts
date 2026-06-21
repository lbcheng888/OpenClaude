// @ts-nocheck
import {Sts,bts} from "./m707.ts";
import {EWe,Y7t} from "./m63.ts";
import {b} from "../runtime.ts";
function Ets(e,t,n,r,o){var s=-1,i=e.length;n||(n=Sts),o||(o=[]);while(++s<i){var a=e[s];if(t>0&&n(a))if(t>1)Ets(a,t-1,n,r,o);else EWe(o,a);else if(!r)o[o.length]=a}return o}
var Cts;
var vts=b(()=>{Y7t();bts();Cts=Ets});
export {Ets,Cts,vts};
