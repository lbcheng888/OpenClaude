// @ts-nocheck
import {LIi,S3r,MIi} from "./m2565.ts";
import {Wo,Ts} from "./m2542.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function xA(e,t,n){return LIi(Wo,t,e,n)}
function BIi(e,t,n=!0){let{handleInterrupt:r,handleExit:o,exitState:s}=S3r(t,e);return{entries:NIi.useMemo(()=>n?[{action:"app:interrupt",run:r},{action:"app:exit",run:o}]:[],[n,r,o]),exitState:s}}
var NIi;
var jH=b(()=>{Ts();MIi();NIi=M(Te(),1)});
export {xA,BIi,NIi,jH};
