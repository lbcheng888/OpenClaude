// @ts-nocheck
import {Q} from "../runtime.ts";
var _Ea=Q((Xat)=>{Object.defineProperty(Xat,"__esModule",{value:!0});Xat.parseRetryAfterToMills=Xat.isExportRetryable=void 0;function ysp(e){return[429,502,503,504].includes(e)}Xat.isExportRetryable=ysp;function Tsp(e){if(e==null)return;let t=Number.parseInt(e,10);if(Number.isInteger(t))return t>0?t*1000:-1;let n=new Date(e).getTime()-Date.now();if(n>=0)return n;return 0}Xat.parseRetryAfterToMills=Tsp});
export {_Ea};
