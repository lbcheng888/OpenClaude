// @ts-nocheck
import {Q} from "../runtime.ts";
var ZHa=Q((qlt)=>{Object.defineProperty(qlt,"__esModule",{value:!0});qlt.callWithTimeout=qlt.TimeoutError=void 0;class LFn extends Error{constructor(e){super(e);Object.setPrototypeOf(this,LFn.prototype)}}qlt.TimeoutError=LFn;function X_p(e,t){let n,r=new Promise(function(s,i){n=setTimeout(function(){i(new LFn("Operation timed out."))},t)});return Promise.race([e,r]).then((o)=>(clearTimeout(n),o),(o)=>{throw clearTimeout(n),o})}qlt.callWithTimeout=X_p});
export {ZHa};
