// @ts-nocheck
import {Q} from "../runtime.ts";
import {rIa} from "./m3669.ts";
var sIa=Q((NFn)=>{Object.defineProperty(NFn,"__esModule",{value:!0});NFn.BindOnceFuture=void 0;var Z_p=rIa();class oIa{_isCalled=!1;_deferred=new Z_p.Deferred;_callback;_that;constructor(e,t){this._callback=e,this._that=t}get isCalled(){return this._isCalled}get promise(){return this._deferred.promise}call(...e){if(!this._isCalled){this._isCalled=!0;try{Promise.resolve(this._callback.call(this._that,...e)).then((t)=>this._deferred.resolve(t),(t)=>this._deferred.reject(t))}catch(t){this._deferred.reject(t)}}return this._deferred.promise}}NFn.BindOnceFuture=oIa});
export {sIa};
