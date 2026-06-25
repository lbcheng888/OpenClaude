// @ts-nocheck
import {yTi,TTi,STi} from "./m2176.ts";
import {C2r,CTi} from "./m2178.ts";
import {Uxt} from "./m2164.ts";
import {S2r,_Ti} from "./m2175.ts";
import {b,x} from "../runtime.ts";
import {y2r} from "./m2173.ts";
import {xi} from "./m2096.ts";
import {zZe} from "./m2163.ts";
import {pg} from "./m2138.ts";
class cUe{_shutdownOnce;_sharedState;constructor(e={}){let t=jSn.merge({},yTi(),e),n=e.resource??ATi.defaultResource();this._sharedState=new C2r(n,t.forceFlushTimeoutMillis,TTi(t.logRecordLimits),e?.processors??[]),this._shutdownOnce=new jSn.BindOnceFuture(this._shutdown,this)}getLogger(e,t,n){if(this._shutdownOnce.isCalled)return Wxt.diag.warn("A shutdown LoggerProvider cannot provide a Logger"),Uxt;if(!e)Wxt.diag.warn("Logger requested without instrumentation scope name.");let r=e||mid,o=`${r}@${t||""}:${n?.schemaUrl||""}`;if(!this._sharedState.loggers.has(o))this._sharedState.loggers.set(o,new S2r({name:r,version:t,schemaUrl:n?.schemaUrl},this._sharedState));return this._sharedState.loggers.get(o)}forceFlush(){if(this._shutdownOnce.isCalled)return Wxt.diag.warn("invalid attempt to force flush after LoggerProvider shutdown"),this._shutdownOnce.promise;return this._sharedState.activeProcessor.forceFlush()}shutdown(){if(this._shutdownOnce.isCalled)return Wxt.diag.warn("shutdown may only be called once per LoggerProvider"),this._shutdownOnce.promise;return this._shutdownOnce.call()}_shutdown(){return this._sharedState.activeProcessor.shutdown()}}
var Wxt,ATi,jSn,mid="unknown";
var RTi=b(()=>{y2r();_Ti();STi();CTi();Wxt=x(xi(),1),ATi=x(zZe(),1),jSn=x(pg(),1)});
export {cUe,Wxt,ATi,jSn,mid,RTi};
