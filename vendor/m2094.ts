// @ts-nocheck
import {Q} from "../runtime.ts";
import {JBe} from "./m2055.ts";
import {wUr} from "./m2078.ts";
import {PTn} from "./m2074.ts";
import {EUr} from "./m2073.ts";
import {XBe} from "./m2059.ts";
var qci=Q((jTn)=>{Object.defineProperty(jTn,"__esModule",{value:!0});jTn.TraceAPI=void 0;var FUr=JBe(),Bci=wUr(),Uci=PTn(),BZe=EUr(),$ci=XBe(),BUr="trace";class UUr{constructor(){this._proxyTracerProvider=new Bci.ProxyTracerProvider,this.wrapSpanContext=Uci.wrapSpanContext,this.isSpanContextValid=Uci.isSpanContextValid,this.deleteSpan=BZe.deleteSpan,this.getSpan=BZe.getSpan,this.getActiveSpan=BZe.getActiveSpan,this.getSpanContext=BZe.getSpanContext,this.setSpan=BZe.setSpan,this.setSpanContext=BZe.setSpanContext}static getInstance(){if(!this._instance)this._instance=new UUr;return this._instance}setGlobalTracerProvider(e){let t=(0,FUr.registerGlobal)(BUr,this._proxyTracerProvider,$ci.DiagAPI.instance());if(t)this._proxyTracerProvider.setDelegate(e);return t}getTracerProvider(){return(0,FUr.getGlobal)(BUr)||this._proxyTracerProvider}getTracer(e,t){return this.getTracerProvider().getTracer(e,t)}disable(){(0,FUr.unregisterGlobal)(BUr,$ci.DiagAPI.instance()),this._proxyTracerProvider=new Bci.ProxyTracerProvider}}jTn.TraceAPI=UUr});
export {qci};
