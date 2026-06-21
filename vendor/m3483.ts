// @ts-nocheck
import {X} from "../runtime.ts";
var nAa=X((eit)=>{Object.defineProperty(eit,"__esModule",{value:!0});eit.parseRetryAfterToMills=eit.isExportRetryable=void 0;function Izd(e){return[429,502,503,504].includes(e)}eit.isExportRetryable=Izd;function Dzd(e){if(e==null)return;let t=Number.parseInt(e,10);if(Number.isInteger(t))return t>0?t*1000:-1;let n=new Date(e).getTime()-Date.now();if(n>=0)return n;return 0}eit.parseRetryAfterToMills=Dzd});
export {nAa};
