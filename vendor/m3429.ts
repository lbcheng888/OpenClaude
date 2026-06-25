// @ts-nocheck
import {T_e,Jno} from "./m3428.ts";
import {a4e,Yno} from "./m3427.ts";
import {b,x} from "../runtime.ts";
import {xi} from "./m2096.ts";
import {pg} from "./m2138.ts";
class Gat{_root;_remoteParentSampled;_remoteParentNotSampled;_localParentSampled;_localParentNotSampled;constructor(e){if(this._root=e.root,!this._root)zTa.globalErrorHandler(Error("ParentBasedSampler must have a root sampler configured")),this._root=new T_e;this._remoteParentSampled=e.remoteParentSampled??new T_e,this._remoteParentNotSampled=e.remoteParentNotSampled??new a4e,this._localParentSampled=e.localParentSampled??new T_e,this._localParentNotSampled=e.localParentNotSampled??new a4e}shouldSample(e,t,n,r,o,s){let i=l4e.trace.getSpanContext(e);if(!i||!l4e.isSpanContextValid(i))return this._root.shouldSample(e,t,n,r,o,s);if(i.isRemote){if(i.traceFlags&l4e.TraceFlags.SAMPLED)return this._remoteParentSampled.shouldSample(e,t,n,r,o,s);return this._remoteParentNotSampled.shouldSample(e,t,n,r,o,s)}if(i.traceFlags&l4e.TraceFlags.SAMPLED)return this._localParentSampled.shouldSample(e,t,n,r,o,s);return this._localParentNotSampled.shouldSample(e,t,n,r,o,s)}toString(){return`ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`}}
var l4e,zTa;
var jTa=b(()=>{Yno();Jno();l4e=x(xi(),1),zTa=x(pg(),1)});
export {Gat,l4e,zTa,jTa};
