// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ki} from "./m2453.ts";
import {QQe} from "./m2286.ts";
import {N4} from "./m2376.ts";
import {_$r} from "./m2415.ts";
import {XS} from "../src/config/2341_XS.ts";
import {ze} from "./m2452.ts";
import {dr} from "./m231.ts";
import {Te} from "./m2253.ts";
function xTl(e){return`rgb(${e&255},${e>>8&255},${e>>16&255})`}
var mnm,hCo,fnm=64,Anm=64,GYy,VYy,hnm,KYy;
var kTl=b(()=>{ki();QQe();N4();_$r();XS();ze();dr();mnm=M(Te(),1),hCo=M(Te(),1);GYy=Array.from({length:fnm},(e,t)=>xTl(t*2043453)),VYy=Array.from({length:Anm},(e,t)=>xTl(t*461587+8405034)),hnm=[[33,94],[161,431],[592,96],[880,144],[1024,256],[8592,112],[8704,256],[9472,128],[9600,32],[9632,96]],KYy=hnm.reduce((e,[,t])=>e+t,0)});
export {xTl,mnm,hCo,fnm,Anm,GYy,VYy,hnm,KYy,kTl};
