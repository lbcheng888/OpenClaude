// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {Mk,Vet,yE,_ve,t3r,dO,Nh} from "./m2278.ts";
import {Tve} from "./m2279.ts";
var Qwi={};
ft(Qwi,{getEraseScreenSequence:()=>getEraseScreenSequence,getClearTerminalSequence:()=>getClearTerminalSequence,eraseViewportInPlace:()=>eraseViewportInPlace});
function getClearTerminalSequence(){return Mk+Vet+yE}
function getEraseScreenSequence(){return Mk+yE}
function eraseViewportInPlace(e){return yE+(_ve+t3r(1)).repeat(e)+yE}
var ghg;
var Z3r=b(()=>{Tve();dO();ghg=Nh(0,"f")});
export {Qwi,getClearTerminalSequence,getEraseScreenSequence,eraseViewportInPlace,ghg,Z3r};
