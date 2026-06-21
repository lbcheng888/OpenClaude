// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {UH,GQe,uC,Pve,CFr,zO,Oh} from "./m2268.ts";
import {rZe} from "./m2292.ts";
var WSi={};
isFullscreenWithTTY(WSi,{getEraseScreenSequence:()=>getEraseScreenSequence,getClearTerminalSequence:()=>getClearTerminalSequence,eraseViewportInPlace:()=>eraseViewportInPlace});
function getClearTerminalSequence(){return UH+GQe+uC}
function getEraseScreenSequence(){return UH+uC}
function eraseViewportInPlace(e){return uC+(Pve+CFr(1)).repeat(e)+uC}
var Mnh;
var bUr=b(()=>{rZe();zO();Mnh=Oh(0,"f")});
export {WSi,getClearTerminalSequence,getEraseScreenSequence,eraseViewportInPlace,Mnh,bUr};
