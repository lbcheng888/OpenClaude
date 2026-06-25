// @ts-nocheck
import {Q} from "../runtime.ts";
var cHa=Q((gFn)=>{Object.defineProperty(gFn,"__esModule",{value:!0});gFn.AnchoredClock=void 0;class lHa{_monotonicClock;_epochMillis;_performanceMillis;constructor(e,t){this._monotonicClock=t,this._epochMillis=e.now(),this._performanceMillis=t.now()}now(){let e=this._monotonicClock.now()-this._performanceMillis;return this._epochMillis+e}}gFn.AnchoredClock=lHa});
export {cHa};
