// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {wV,Gx} from "./m8.ts";
var fyt={};
isFullscreenWithTTY(fyt,{default:()=>Ayt});
function bgc(e,t){if(t)return e.slice();var n=e.length,r=_9o?_9o(n):new e.constructor(n);return e.copy(r),r}
var y9o,h9o,Sgc,g9o,_9o,Ayt;
var $or=b(()=>{wV();y9o=typeof fyt=="object"&&fyt&&!fyt.nodeType&&fyt,h9o=y9o&&typeof Qzt=="object"&&Qzt&&!Qzt.nodeType&&Qzt,Sgc=h9o&&h9o.exports===y9o,g9o=Sgc?Gx.Buffer:void 0,_9o=g9o?g9o.allocUnsafe:void 0;Ayt=bgc});
export {fyt,bgc,y9o,h9o,Sgc,g9o,_9o,Ayt,$or};
