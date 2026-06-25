// @ts-nocheck
import {b,x} from "../runtime.ts";
import {ui} from "./m2463.ts";
import {ett} from "./m2297.ts";
import {o4} from "./m2386.ts";
import {Yqr} from "./m2425.ts";
import {nS} from "../src/config/2351_nS.ts";
import {je} from "./m2462.ts";
import {lr} from "./m233.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Pkl(e){return`rgb(${e&255},${e>>8&255},${e>>16&255})`}
var OHo,Okl,kdm=64,Hdm=64,zuS,juS,Idm,YuS;
var Lkl=b(()=>{ui();ett();o4();Yqr();nS();je();lr();OHo=x(et(),1),Okl=x(oe(),1);zuS=Array.from({length:kdm},(e,t)=>Pkl(t*2043453)),juS=Array.from({length:Hdm},(e,t)=>Pkl(t*461587+8405034)),Idm=[[33,94],[161,431],[592,96],[880,144],[1024,256],[8592,112],[8704,256],[9472,128],[9600,32],[9632,96]],YuS=Idm.reduce((e,[,t])=>e+t,0)});
export {Pkl,OHo,Okl,kdm,Hdm,zuS,juS,Idm,YuS,Lkl};
