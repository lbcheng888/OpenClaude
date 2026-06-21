// @ts-nocheck
import {X} from "../runtime.ts";
var dno=X((u6)=>{Object.defineProperty(u6,"__esModule",{value:!0});u6.getSignificand=u6.getNormalBase2=u6.MIN_VALUE=u6.MAX_NORMAL_EXPONENT=u6.MIN_NORMAL_EXPONENT=u6.SIGNIFICAND_WIDTH=void 0;u6.SIGNIFICAND_WIDTH=52;var qap=2146435072,jap=1048575,uno=1023;u6.MIN_NORMAL_EXPONENT=-uno+1;u6.MAX_NORMAL_EXPONENT=uno;u6.MIN_VALUE=Math.pow(2,-1022);function Wap(e){let t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e),((t.getUint32(0)&qap)>>20)-uno}u6.getNormalBase2=Wap;function Gap(e){let t=new DataView(new ArrayBuffer(8));t.setFloat64(0,e);let n=t.getUint32(0),r=t.getUint32(4);return(n&jap)*Math.pow(2,32)+r}u6.getSignificand=Gap});
export {dno};
