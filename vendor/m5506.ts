// @ts-nocheck
import {fhe,pAn} from "./m2403.ts";
import {GRn,J2} from "../src/session/2532_id.ts";
import {b} from "../runtime.ts";
function tUo(e,t,n){return(r,o,s,i,a)=>{let l=t.current++;e.current[l]={id:l,type:"image",content:r,mediaType:o??"image/png",filename:s,dimensions:i,sourcePath:a},n(new fhe(`${GRn(l)} `))}}
var Oec=b(()=>{J2();pAn()});
export {tUo,Oec};
