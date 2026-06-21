// @ts-nocheck
import {X} from "../runtime.ts";
var Bba=X((Git)=>{Object.defineProperty(Git,"__esModule",{value:!0});Git.callWithTimeout=Git.TimeoutError=void 0;class qMn extends Error{constructor(e){super(e);Object.setPrototypeOf(this,qMn.prototype)}}Git.TimeoutError=qMn;function cap(e,t){let n,r=new Promise(function(s,i){n=setTimeout(function(){i(new qMn("Operation timed out."))},t)});return Promise.race([e,r]).then((o)=>(clearTimeout(n),o),(o)=>{throw clearTimeout(n),o})}Git.callWithTimeout=cap});
export {Bba};
