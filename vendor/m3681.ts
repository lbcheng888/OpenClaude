// @ts-nocheck
import {Q} from "../runtime.ts";
var zio=Q((vq)=>{Object.defineProperty(vq,"__esModule",{value:!0});vq.getSignificand=vq.getNormalBase2=vq.MIN_VALUE=vq.MAX_NORMAL_EXPONENT=vq.MIN_NORMAL_EXPONENT=vq.SIGNIFICAND_WIDTH=void 0;vq.SIGNIFICAND_WIDTH=52;var Hyp=2146435072,Iyp=1048575,Kio=1023;vq.MIN_NORMAL_EXPONENT=-Kio+1;vq.MAX_NORMAL_EXPONENT=Kio;vq.MIN_VALUE=Math.pow(2,-1022);function xyp(e){let t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e),((t.getUint32(0)&Hyp)>>20)-Kio}vq.getNormalBase2=xyp;function Dyp(e){let t=new DataView(new ArrayBuffer(8));t.setFloat64(0,e);let n=t.getUint32(0),r=t.getUint32(4);return(n&Iyp)*Math.pow(2,32)+r}vq.getSignificand=Dyp});
export {zio};
