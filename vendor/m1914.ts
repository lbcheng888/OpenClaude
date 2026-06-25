// @ts-nocheck
import {k1r,pri} from "./m1913.ts";
import {b,x} from "../runtime.ts";
function FQe(){if(H1r===void 0)H1r=fYu()||k1r();return H1r}
var mri,H1r,fYu=()=>{try{return mri.default.statSync("/run/.containerenv"),!0}catch{return!1}};
var I1r=b(()=>{pri();mri=x(require("fs"))});
export {FQe,mri,H1r,fYu,I1r};
