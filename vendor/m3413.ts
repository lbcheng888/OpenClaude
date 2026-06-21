// @ts-nocheck
import {sge,fQr} from "./m3412.ts";
import {K9e,mQr} from "./m3411.ts";
import {b,M} from "../runtime.ts";
import {Xi} from "./m2091.ts";
import {ag} from "./m2133.ts";
class Kst{_root;_remoteParentSampled;_remoteParentNotSampled;_localParentSampled;_localParentNotSampled;constructor(e){if(this._root=e.root,!this._root)Dpa.globalErrorHandler(Error("ParentBasedSampler must have a root sampler configured")),this._root=new sge;this._remoteParentSampled=e.remoteParentSampled??new sge,this._remoteParentNotSampled=e.remoteParentNotSampled??new K9e,this._localParentSampled=e.localParentSampled??new sge,this._localParentNotSampled=e.localParentNotSampled??new K9e}shouldSample(e,t,n,r,o,s){let i=z9e.trace.getSpanContext(e);if(!i||!z9e.isSpanContextValid(i))return this._root.shouldSample(e,t,n,r,o,s);if(i.isRemote){if(i.traceFlags&z9e.TraceFlags.SAMPLED)return this._remoteParentSampled.shouldSample(e,t,n,r,o,s);return this._remoteParentNotSampled.shouldSample(e,t,n,r,o,s)}if(i.traceFlags&z9e.TraceFlags.SAMPLED)return this._localParentSampled.shouldSample(e,t,n,r,o,s);return this._localParentNotSampled.shouldSample(e,t,n,r,o,s)}toString(){return`ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`}}
var z9e,Dpa;
var Ppa=b(()=>{mQr();fQr();z9e=M(Xi(),1),Dpa=M(ag(),1)});
export {Kst,z9e,Dpa,Ppa};
