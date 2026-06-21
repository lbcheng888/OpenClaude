// @ts-nocheck
import {V1r,Tmi} from "./m2169.ts";
import {b,M} from "../runtime.ts";
import {Xi} from "./m2091.ts";
class K1r{instrumentationScope;_sharedState;constructor(e,t){this.instrumentationScope=e,this._sharedState=t}emit(e){let t=e.context||Smi.context.active(),n=new V1r(this._sharedState,this.instrumentationScope,{context:t,...e});this._sharedState.activeProcessor.onEmit(n,t),n._makeReadonly()}}
var Smi;
var bmi=b(()=>{Tmi();Smi=M(Xi(),1)});
export {K1r,Smi,bmi};
