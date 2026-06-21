// @ts-nocheck
import {Emi,Cmi,vmi} from "./m2171.ts";
import {J1r,xmi} from "./m2173.ts";
import {mHt} from "./m2159.ts";
import {K1r,bmi} from "./m2170.ts";
import {b,M} from "../runtime.ts";
import {G1r} from "./m2168.ts";
import {Xi} from "./m2091.ts";
import {zXe} from "./m2158.ts";
import {ag} from "./m2133.ts";
class pFe{_shutdownOnce;_sharedState;constructor(e={}){let t=A_n.merge({},Emi(),e),n=e.resource??kmi.defaultResource();this._sharedState=new J1r(n,t.forceFlushTimeoutMillis,Cmi(t.logRecordLimits),e?.processors??[]),this._shutdownOnce=new A_n.BindOnceFuture(this._shutdown,this)}getLogger(e,t,n){if(this._shutdownOnce.isCalled)return hHt.diag.warn("A shutdown LoggerProvider cannot provide a Logger"),mHt;if(!e)hHt.diag.warn("Logger requested without instrumentation scope name.");let r=e||KYu,o=`${r}@${t||""}:${n?.schemaUrl||""}`;if(!this._sharedState.loggers.has(o))this._sharedState.loggers.set(o,new K1r({name:r,version:t,schemaUrl:n?.schemaUrl},this._sharedState));return this._sharedState.loggers.get(o)}forceFlush(){if(this._shutdownOnce.isCalled)return hHt.diag.warn("invalid attempt to force flush after LoggerProvider shutdown"),this._shutdownOnce.promise;return this._sharedState.activeProcessor.forceFlush()}shutdown(){if(this._shutdownOnce.isCalled)return hHt.diag.warn("shutdown may only be called once per LoggerProvider"),this._shutdownOnce.promise;return this._shutdownOnce.call()}_shutdown(){return this._sharedState.activeProcessor.shutdown()}}
var hHt,kmi,A_n,KYu="unknown";
var Hmi=b(()=>{G1r();bmi();vmi();xmi();hHt=M(Xi(),1),kmi=M(zXe(),1),A_n=M(ag(),1)});
export {pFe,hHt,kmi,A_n,KYu,Hmi};
