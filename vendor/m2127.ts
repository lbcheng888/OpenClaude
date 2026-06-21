// @ts-nocheck
import {X} from "../runtime.ts";
var _pi=X((jXe)=>{Object.defineProperty(jXe,"__esModule",{value:!0});jXe.callWithTimeout=jXe.TimeoutError=void 0;class Bgn extends Error{constructor(e){super(e);Object.setPrototypeOf(this,Bgn.prototype)}}jXe.TimeoutError=Bgn;function Ozu(e,t){let n,r=new Promise(function(s,i){n=setTimeout(function(){i(new Bgn("Operation timed out."))},t)});return Promise.race([e,r]).then((o)=>(clearTimeout(n),o),(o)=>{throw clearTimeout(n),o})}jXe.callWithTimeout=Ozu});
export {_pi};
