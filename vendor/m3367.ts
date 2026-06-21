// @ts-nocheck
import {X} from "../runtime.ts";
var YXr=X((Xq)=>{Object.defineProperty(Xq,"__esModule",{value:!0});Xq.getSignificand=Xq.getNormalBase2=Xq.MIN_VALUE=Xq.MAX_NORMAL_EXPONENT=Xq.MIN_NORMAL_EXPONENT=Xq.SIGNIFICAND_WIDTH=void 0;Xq.SIGNIFICAND_WIDTH=52;var eVd=2146435072,tVd=1048575,zXr=1023;Xq.MIN_NORMAL_EXPONENT=-zXr+1;Xq.MAX_NORMAL_EXPONENT=zXr;Xq.MIN_VALUE=Math.pow(2,-1022);function nVd(e){let t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e),((t.getUint32(0)&eVd)>>20)-zXr}Xq.getNormalBase2=nVd;function rVd(e){let t=new DataView(new ArrayBuffer(8));t.setFloat64(0,e);let n=t.getUint32(0),r=t.getUint32(4);return(n&tVd)*Math.pow(2,32)+r}Xq.getSignificand=rVd});
export {YXr};
