// @ts-nocheck
import {QDr,gXs} from "./m1908.ts";
import {b,M} from "../runtime.ts";
function UJe(){if(ZDr===void 0)ZDr=Yqu()||QDr();return ZDr}
var _Xs,ZDr,Yqu=()=>{try{return _Xs.default.statSync("/run/.containerenv"),!0}catch{return!1}};
var ePr=b(()=>{gXs();_Xs=M(require("fs"))});
export {UJe,_Xs,ZDr,Yqu,ePr};
