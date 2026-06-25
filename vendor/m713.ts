// @ts-nocheck
import {_as,yas} from "./m712.ts";
import {gKe,CYt} from "./m59.ts";
import {b} from "../runtime.ts";
function Tas(e,t,n,r,o){var s=-1,i=e.length;n||(n=_as),o||(o=[]);while(++s<i){var a=e[s];if(t>0&&n(a))if(t>1)Tas(a,t-1,n,r,o);else gKe(o,a);else if(!r)o[o.length]=a}return o}
var Sas;
var bas=b(()=>{CYt();yas();Sas=Tas});
export {Tas,Sas,bas};
