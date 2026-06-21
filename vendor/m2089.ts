// @ts-nocheck
import {X} from "../runtime.ts";
import {ZBe} from "./m2050.ts";
import {e1r} from "./m2073.ts";
import {egn} from "./m2069.ts";
import {YMr} from "./m2068.ts";
import {eFe} from "./m2054.ts";
var Kri=X((Agn)=>{Object.defineProperty(Agn,"__esModule",{value:!0});Agn.TraceAPI=void 0;var d1r=ZBe(),Wri=e1r(),Gri=egn(),UXe=YMr(),Vri=eFe(),p1r="trace";class m1r{constructor(){this._proxyTracerProvider=new Wri.ProxyTracerProvider,this.wrapSpanContext=Gri.wrapSpanContext,this.isSpanContextValid=Gri.isSpanContextValid,this.deleteSpan=UXe.deleteSpan,this.getSpan=UXe.getSpan,this.getActiveSpan=UXe.getActiveSpan,this.getSpanContext=UXe.getSpanContext,this.setSpan=UXe.setSpan,this.setSpanContext=UXe.setSpanContext}static getInstance(){if(!this._instance)this._instance=new m1r;return this._instance}setGlobalTracerProvider(e){let t=(0,d1r.registerGlobal)(p1r,this._proxyTracerProvider,Vri.DiagAPI.instance());if(t)this._proxyTracerProvider.setDelegate(e);return t}getTracerProvider(){return(0,d1r.getGlobal)(p1r)||this._proxyTracerProvider}getTracer(e,t){return this.getTracerProvider().getTracer(e,t)}disable(){(0,d1r.unregisterGlobal)(p1r,Vri.DiagAPI.instance()),this._proxyTracerProvider=new Wri.ProxyTracerProvider}}Agn.TraceAPI=m1r});
export {Kri};
