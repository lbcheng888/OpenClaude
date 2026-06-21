// @ts-nocheck
import {b} from "../runtime.ts";
function Pyi(e,t){if(e<2)return;if(ETn.size>=(Ctd??Etd)){YFr=!0;return}ETn.add(e*btd+t)}
function _It(e){CTn=e}
function Myi(e){tUe=e}
function XFr(e){Nyi++,Byi=e,Fyi=performance.now()}
function QFr(){return{count:Nyi,lastReason:Byi,lastResetAt:Fyi}}
function yIt(){return{atlasKeys:ETn.size,saturated:YFr}}
function ZFr(){ETn.clear(),YFr=!1}
function Uyi(e){bTn=e}
function $yi(){if(!bTn)return null;return{size:bTn.size,overflowed:bTn.overflowed}}
function qyi(){if(Iyi)return!1;return Iyi=!0,!0}
function jyi(){if(Dyi)return!1;return Dyi=!0,!0}
var CTn=!1,tUe=!1,btd=32768,Etd=131072,ETn,YFr=!1,Ctd=null,bTn=null,Iyi=!1,Dyi=!1,Oyi=!1,Lyi=!1,JFr=!1,Nyi=0,Byi="none",Fyi=0;
var QQe=b(()=>{ETn=new Set});
export {Pyi,_It,Myi,XFr,QFr,yIt,ZFr,Uyi,$yi,qyi,jyi,CTn,tUe,btd,Etd,ETn,YFr,Ctd,bTn,Iyi,Dyi,Oyi,Lyi,JFr,Nyi,Byi,Fyi,QQe};
