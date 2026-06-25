// @ts-nocheck
import {jy,DU} from "./m60.ts";
import {yJo,TJo} from "./m453.ts";
import {EJo,CJo} from "./m456.ts";
import {U9,Ibe} from "./m118.ts";
import {b} from "../runtime.ts";
function _Uc(e,t){return function(n,r){var o=jy(n)?yJo:EJo,s=t?t():{};return o(n,e,U9(r,2),s)}}
var AJo;
var RJo=b(()=>{TJo();CJo();Ibe();DU();AJo=_Uc});
export {_Uc,AJo,RJo};
