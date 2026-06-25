// @ts-nocheck
import {Q} from "../runtime.ts";
var tui=Q((XTn)=>{Object.defineProperty(XTn,"__esModule",{value:!0});XTn.AnchoredClock=void 0;class eui{_monotonicClock;_epochMillis;_performanceMillis;constructor(e,t){this._monotonicClock=t,this._epochMillis=e.now(),this._performanceMillis=t.now()}now(){let e=this._monotonicClock.now()-this._performanceMillis;return this._epochMillis+e}}XTn.AnchoredClock=eui});
export {tui};
