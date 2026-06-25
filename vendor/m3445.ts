// @ts-nocheck
import {b,x} from "../runtime.ts";
import {pg} from "./m2138.ts";
function SSa(e){return{code:iro.ExportResultCode.FAILED,error:Error(e)}}
function bSa(){}
class aro{delegate;buffer=[];shutDown=!1;setDelegate(e){if(this.shutDown){e.shutdown().catch(()=>{});return}this.delegate=e;let t=this.buffer;this.buffer=[];for(let n of t)e.export(n,bSa)}export(e,t){if(this.shutDown){t(SSa("Exporter has been shut down"));return}if(this.delegate){this.delegate.export(e,t);return}if(this.buffer.length>=ySa)this.buffer.shift();this.buffer.push(e),t(TSa)}async forceFlush(){if(this.delegate?.forceFlush)await this.delegate.forceFlush()}async shutdown(){if(this.shutDown=!0,this.buffer=[],this.delegate)await this.delegate.shutdown()}}
class lro{delegate;buffer=[];shutDown=!1;setDelegate(e){if(this.shutDown){e.shutdown().catch(()=>{});return}this.delegate=e;let t=this.buffer;this.buffer=[];for(let n of t)e.export(n,bSa)}export(e,t){if(this.shutDown){t(SSa("Exporter has been shut down"));return}if(this.delegate){this.delegate.export(e,t);return}if(this.buffer.length>=ySa)this.buffer.shift();this.buffer.push(e),t(TSa)}async shutdown(){if(this.shutDown=!0,this.buffer=[],this.delegate)await this.delegate.shutdown()}}
var iro,ySa=64,TSa;
var ESa=b(()=>{iro=x(pg(),1),TSa={code:iro.ExportResultCode.SUCCESS}});
export {SSa,bSa,aro,lro,iro,ySa,TSa,ESa};
