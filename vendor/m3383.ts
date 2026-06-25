// @ts-nocheck
import {Q} from "../runtime.ts";
var xno=Q((mq)=>{Object.defineProperty(mq,"__esModule",{value:!0});mq.getSignificand=mq.getNormalBase2=mq.MIN_VALUE=mq.MAX_NORMAL_EXPONENT=mq.MIN_NORMAL_EXPONENT=mq.SIGNIFICAND_WIDTH=void 0;mq.SIGNIFICAND_WIDTH=52;var $tp=2146435072,qtp=1048575,Ino=1023;mq.MIN_NORMAL_EXPONENT=-Ino+1;mq.MAX_NORMAL_EXPONENT=Ino;mq.MIN_VALUE=Math.pow(2,-1022);function Wtp(e){let t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e),((t.getUint32(0)&$tp)>>20)-Ino}mq.getNormalBase2=Wtp;function Gtp(e){let t=new DataView(new ArrayBuffer(8));t.setFloat64(0,e);let n=t.getUint32(0),r=t.getUint32(4);return(n&qtp)*Math.pow(2,32)+r}mq.getSignificand=Gtp});
export {xno};
