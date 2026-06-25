// @ts-nocheck
import {l1i,J5r,c1i} from "./m2576.ts";
import {Oo,ss} from "./m2553.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function Df(e,t,n){return l1i(Oo,t,e,n)}
function d1i(e,t,n=!0){let{handleInterrupt:r,handleExit:o,exitState:s}=J5r(t,e);return{entries:u1i.useMemo(()=>n?[{action:"app:interrupt",run:r},{action:"app:exit",run:o}]:[],[n,r,o]),exitState:s}}
var u1i;
var TI=b(()=>{ss();c1i();u1i=x(et(),1)});
export {Df,d1i,u1i,TI};
