// @ts-nocheck
import {X} from "../runtime.ts";
var ioi=X((_gn)=>{Object.defineProperty(_gn,"__esModule",{value:!0});_gn.AnchoredClock=void 0;class soi{_monotonicClock;_epochMillis;_performanceMillis;constructor(e,t){this._monotonicClock=t,this._epochMillis=e.now(),this._performanceMillis=t.now()}now(){let e=this._monotonicClock.now()-this._performanceMillis;return this._epochMillis+e}}_gn.AnchoredClock=soi});
export {ioi};
