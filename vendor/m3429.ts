// @ts-nocheck
import {b,M} from "../runtime.ts";
import {ag} from "./m2133.ts";
function sma(e){return{code:CQr.ExportResultCode.FAILED,error:Error(e)}}
function ima(){}
class vQr{delegate;buffer=[];shutDown=!1;setDelegate(e){if(this.shutDown){e.shutdown().catch(()=>{});return}this.delegate=e;let t=this.buffer;this.buffer=[];for(let n of t)e.export(n,ima)}export(e,t){if(this.shutDown){t(sma("Exporter has been shut down"));return}if(this.delegate){this.delegate.export(e,t);return}if(this.buffer.length>=rma)this.buffer.shift();this.buffer.push(e),t(oma)}async forceFlush(){if(this.delegate?.forceFlush)await this.delegate.forceFlush()}async shutdown(){if(this.shutDown=!0,this.buffer=[],this.delegate)await this.delegate.shutdown()}}
class wQr{delegate;buffer=[];shutDown=!1;setDelegate(e){if(this.shutDown){e.shutdown().catch(()=>{});return}this.delegate=e;let t=this.buffer;this.buffer=[];for(let n of t)e.export(n,ima)}export(e,t){if(this.shutDown){t(sma("Exporter has been shut down"));return}if(this.delegate){this.delegate.export(e,t);return}if(this.buffer.length>=rma)this.buffer.shift();this.buffer.push(e),t(oma)}async shutdown(){if(this.shutDown=!0,this.buffer=[],this.delegate)await this.delegate.shutdown()}}
var CQr,rma=64,oma;
var ama=b(()=>{CQr=M(ag(),1),oma={code:CQr.ExportResultCode.SUCCESS}});
export {sma,ima,vQr,wQr,CQr,rma,oma,ama};
