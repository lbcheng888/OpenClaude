// @ts-nocheck
import {X} from "../runtime.ts";
var zSa=X((EMn)=>{Object.defineProperty(EMn,"__esModule",{value:!0});EMn.AnchoredClock=void 0;class KSa{_monotonicClock;_epochMillis;_performanceMillis;constructor(e,t){this._monotonicClock=t,this._epochMillis=e.now(),this._performanceMillis=t.now()}now(){let e=this._monotonicClock.now()-this._performanceMillis;return this._epochMillis+e}}EMn.AnchoredClock=KSa});
export {zSa};
