// @ts-nocheck
import {Q} from "../runtime.ts";
import {_yi} from "./m2134.ts";
var Tyi=Q((TSn)=>{Object.defineProperty(TSn,"__esModule",{value:!0});TSn.BindOnceFuture=void 0;var nsd=_yi();class yyi{_callback;_that;_isCalled=!1;_deferred=new nsd.Deferred;constructor(e,t){this._callback=e,this._that=t}get isCalled(){return this._isCalled}get promise(){return this._deferred.promise}call(...e){if(!this._isCalled){this._isCalled=!0;try{Promise.resolve(this._callback.call(this._that,...e)).then((t)=>this._deferred.resolve(t),(t)=>this._deferred.reject(t))}catch(t){this._deferred.reject(t)}}return this._deferred.promise}}TSn.BindOnceFuture=yyi});
export {Tyi};
