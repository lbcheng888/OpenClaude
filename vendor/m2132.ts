// @ts-nocheck
import {Q} from "../runtime.ts";
var myi=Q((qZe)=>{Object.defineProperty(qZe,"__esModule",{value:!0});qZe.callWithTimeout=qZe.TimeoutError=void 0;class _Sn extends Error{constructor(e){super(e);Object.setPrototypeOf(this,_Sn.prototype)}}qZe.TimeoutError=_Sn;function esd(e,t){let n,r=new Promise(function(s,i){n=setTimeout(function(){i(new _Sn("Operation timed out."))},t)});return Promise.race([e,r]).then((o)=>(clearTimeout(n),o),(o)=>{throw clearTimeout(n),o})}qZe.callWithTimeout=esd});
export {myi};
