// @ts-nocheck
import {T2r,hTi} from "./m2174.ts";
import {b,x} from "../runtime.ts";
import {xi} from "./m2096.ts";
class S2r{instrumentationScope;_sharedState;constructor(e,t){this.instrumentationScope=e,this._sharedState=t}emit(e){let t=e.context||gTi.context.active(),n=new T2r(this._sharedState,this.instrumentationScope,{context:t,...e});this._sharedState.activeProcessor.onEmit(n,t),n._makeReadonly()}}
var gTi;
var _Ti=b(()=>{hTi();gTi=x(xi(),1)});
export {S2r,gTi,_Ti};
